import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { Drink } from '../entity/Drink'

/**
 * Drink controller
 */
@Controller('/drink')
export default class DrinkController {
  // get repository for the drink
  private readonly drinkRepository = AppDataSource.getRepository(Drink)
  // validator
  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: { target: false, value: false }
  }

  /**
   * get all method
   */
  @Route('get')
  async all (req: Request, res: Response, next: NextFunction): Promise<Drink | Drink[]> {
    return await this.drinkRepository.find()
  }

  /**
   *get method
   */
  @Route('get', '/:drinkID')
  async read (req: Request, res: Response, next: NextFunction): Promise<Drink | Drink[]> {
    if (req.params.drinkID) {
      return await this.drinkRepository.findOneBy({ drinkID: req.params.drinkID })
    }
  }

  /**
   * post method
   */
  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    // const for a drink object that we can use to transform whats in the body to a new drink
    const drinkToAdd = Object.assign(new Drink(), req.body)
    // check if drink is valid
    const violations = await validate(drinkToAdd, this.validOptions)
    // if not valid send 422 statuscode
    if (violations.length) {
      res.statusCode = 422
    } else {
      // if valid save to repository send back 201
      res.statusCode = 201
      return await this.drinkRepository.save(drinkToAdd)
    }
  }

  /**
   * delete method
   */
  @Route('delete', '/:drinkID')
  async remove (req: Request, res: Response, next: NextFunction): Promise<any> {
    // grab out the drink to remove and send a successful statuscode
    const DrinkToRemove = await this.drinkRepository.findOneBy({ drinkID: req.params.drinkID })
    return await this.drinkRepository.remove(DrinkToRemove)
  }

  /**
   * put method
   */
  @Route('put', '/:drinkID')
  async update (req: Request, res: Response, next: NextFunction): Promise<Drink | ValidationError[] | Number> {
    // search for that drink
    const currentDrink = await this.drinkRepository.preload(req.body)

    // pass the buck if no currentDrink found or the ID's dont match the params ID
    if (!currentDrink || currentDrink.drinkID !== req.params.drinkID) next()
    else {
      const violations = await validate(currentDrink, this.validOptions)
      if (violations.length) {
        res.statusCode = 422 // Unprocessable Entity
        return violations
      } else {
        // save new drink over old one
        return await this.drinkRepository.save(currentDrink)
      }
    }
  }
}
