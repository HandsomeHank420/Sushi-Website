import * as express from 'express'
import * as bodyParser from 'body-parser'
import { AppDataSource } from './data-source'
import * as createError from 'http-errors'
import { RouteDefinition } from './decorator/RouteDefinition'
import FoodController from './Controllers/FoodController'
import DrinkController from './Controllers/DrinkController'
import PersonController from './Controllers/PersonController'
import * as cors from 'cors'
import { Person } from './entity/Person'
import { Food } from './entity/Food'
import { Drink } from './entity/Drink'

const corsOptions = {
  origin: /localhost\:\d{4,5}$/i, // localhost any 4 digit port
  credentials: true, // needed to set and return cookies
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  methods: 'GET,PUT,POST,DELETE',
  maxAge: 43200 // 12 hours
}

const port = 3000

AppDataSource.initialize().then(async () => {
  // create express app
  const app = express()
  app.use(bodyParser.json())
  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))
  // // register express routes from defined application routes
  // Routes.forEach(route => {
  //   (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
  //     const result = (new (route.controller as any)())[route.action](req, res, next)
  //     if (result instanceof Promise) {
  //       void result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
  //     } else if (result !== null && result !== undefined) {
  //       res.json(result)
  //     }
  //   })
  // })

  // Iterate over all our controllers and register our routes
  const usController = [DrinkController, FoodController, PersonController]
  usController.forEach((controller) => {
    // This is our instantiated class
    // eslint-disable-next-line new-cap
    const instance = new controller()
    // The prefix saved to our controller
    const path = Reflect.getMetadata('path', controller)
    // Our `routes` array containing all our routes for this controller
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller)
    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
      // eslint-disable-next-line
      app[route.method.toLowerCase()](path + route.param, (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = instance[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) => result !== null && result !== undefined ? res.send(result) : next())
            .catch((err) => next(createError(500, err)))
        } else if (result !== null && result !== undefined) res.json(result)
      })
    })
  })
  // routes.forEach((route) => {
  //   app[route.method](path + route.param, (req: express.Request, res: express.Response,
  //     next: express.NextFunction) => {
  //     const result = instance[route.action](req, res, next)
  //     if (result instanceof Promise) {
  //       result.then((result) => result !== null && result !== undefined
  //         ? res.send(result)
  //         : next())
  //         .catch((err) => next(createError(500, err)))
  //     } else if (result !== null && result !== undefined) res.json(result)
  //   })
  // })

  app.use(function (req, res, next) {
    next(createError(404))
  })

  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({ status: err.status, message: err.message, stack: err.stack.split(/\s{4,}/) })
  })

  await AppDataSource.manager.save(
    AppDataSource.manager.create(Person, {
      username: 'SushiLover',
      password: '1Bringusbrongus',
      firstName: 'John',
      lastName: 'Smith',
      address: '2530 Lorne Ave',
      phone: '306-717-9923',
      comments: 'I hate Sushi why do I keep eating this',
      email: 'John@hotmail.com'
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Person, {
      username: 'CoolCat',
      password: '2Bringusbrongus',
      firstName: 'Sally',
      lastName: 'Smith',
      address: '2530 Lorne Ave',
      phone: '306-717-8030',
      comments: 'Screw John I love sushi',
      email: 'Sally@hotmail.com'
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Person, {
      username: 'Dredd',
      password: 'IamtheLaw420',
      firstName: 'Judge',
      lastName: 'Dredd',
      address: 'Mega-City One',
      phone: '306-616-9023',
      comments: 'I am the LAW',
      email: 'IAmtheLaw@hotmail.com'
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Salmon Sashimi (6 pcs)',
      itemDescription: 'Thinly sliced pieces of fresh salmon. One order comes with six pieces',
      itemType: 'Sashimi',
      price: 5.99
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Tuna Sashimi (6 pcs)',
      itemDescription: 'Thinly sliced pieces of fresh Tuna. One order comes with six pieces',
      itemType: 'Sashimi',
      price: 4.99
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Red Snapper Sashimi (6 pcs)',
      itemDescription: 'Thinly sliced pieces of fresh Red Snapper. One order comes with six pieces',
      itemType: 'Sashimi',
      price: 6.99
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Blue Snapper Sashimi (6 pcs)',
      itemDescription: 'Thinly sliced pieces of fresh Blue Snapper. One order comes with six pieces',
      itemType: 'Sashimi',
      price: 6.99
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Surf Clam Sushi (2 pcs)',
      itemDescription: 'Thinly sliced raw surf clam served atop a small bed of pressed sushi rice. ' +
        'One order comes with two pieces',
      itemType: 'Sushi',
      price: 2.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Crab meat Sushi (2 pcs)',
      itemDescription: 'Thinly sliced crab meat served atop a small bed of pressed sushi rice. ' +
        'One order comes with two pieces',
      itemType: 'Sushi',
      price: 3.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Snapper Sushi (2 pcs)',
      itemDescription: 'Thinly sliced raw snapper served atop a small bed of pressed sushi rice. ' +
        'One order comes with two pieces',
      itemType: 'Sushi',
      price: 2.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Spicy Salmon Sushi (2 pcs)',
      itemDescription: 'Thinly sliced spicy salmon served atop a small bed of pressed sushi rice. ' +
        'One order comes with two pieces',
      itemType: 'Sushi',
      price: 2.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Lucky Maki Roll (8 pcs)',
      itemDescription: 'A delicious combination of tempura crumbs, salmon, white tuna, snapper, and crab meat, ' +
        'drizzled with a mango sauce. One order comes with eight pieces',
      itemType: 'Maki',
      price: 10.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'SK Maki Roll (8 pcs)',
      itemDescription: 'A tasty blend of tempura crumbs, crab meat, cream cheese, and avocado, ' +
        'topped with red and green flying fish roe. One order comes with eight pieces.',
      itemType: 'Maki',
      price: 9.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Volcano Maki Roll (8 pcs)',
      itemDescription: 'A fiery medley of pineapple, mango and batter, flying fish roe, and spicy mayo, ' +
        'rolled with more flying fish roe. One order comes with eight pieces.',
      itemType: 'Maki',
      price: 9.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Food, {
      itemName: 'Rainbow Maki Roll (8 pcs)',
      itemDescription: 'A colourful medley of cucumber, avocado, crab meat, white tuna, salmon, ' +
        'sushi shrimp, snapper, and eel sauce. One order comes with eight pieces.',
      itemType: 'Maki',
      price: 7.95
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Drink, {
      itemName: 'Sprite(355 ml)',
      itemDescription: 'Choose from a selection of deliciously refreshing canned pop flavours',
      price: 2.50
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Drink, {
      itemName: 'Water(500ml)',
      itemDescription: 'A cold and refreshing bottle of water',
      price: 3.50
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(Drink, {
      itemName: 'Green Tea',
      itemDescription: 'A herbal blend that lifts the spirits',
      price: 3.00
    })
  )

  app.listen(port)

  console.log(`Open http://localhost:${port}/person to see results`)
}).catch(error => console.log(error))
