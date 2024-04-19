import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { Food } from '../entity/Food'

/**
 * Food controller
 */
@Controller('/food')
export default class PersonController {
  // get repository for the food
  private readonly foodRepository = AppDataSource.getRepository(Food)
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
  async all (req: Request, res: Response, next: NextFunction): Promise<Food | Food[]> {
    return await this.foodRepository.find()
  }

  /**
   *get method
   */
  // may need to change this id to personID not sure
  @Route('get', '/:itemType')
  async read (req: Request, res: Response, next: NextFunction): Promise<Food | Food[]> {
    if (req.params.itemType) {
      return await this.foodRepository.findBy({ itemType: req.params.itemType })
    }
  }

  /**
   * post method
   */
  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    // const for a food object that we can use to transform whats in the body to a new food
    const foodToAdd = Object.assign(new Food(), req.body)
    // check if food is valid
    const violations = await validate(foodToAdd, this.validOptions)
    // if not valid send 422 statuscode
    if (violations.length) {
      res.statusCode = 422
      return violations
    } else {
      // if valid save to repository send back 201
      res.statusCode = 201
      return await this.foodRepository.save(foodToAdd)
    }
  }

  /**
   * delete method
   */
  @Route('delete', '/:foodID')
  async remove (req: Request, res: Response, next: NextFunction): Promise<any> {
    // grab out the food to remove and send a successful statuscode
    const FoodToRemove = await this.foodRepository.findOneBy({ foodID: req.params.foodID })
    // if not we can remove the food
    return await this.foodRepository.remove(FoodToRemove)
  }

  /**
   * put method
   */
  @Route('put', '/:foodID')
  async update (req: Request, res: Response, next: NextFunction): Promise<Food | ValidationError[] | Number> {
    // search for that food
    const currentFood = await this.foodRepository.preload(req.body)
    // pass the buck if no currentFood found or the ID's dont match the params ID
    if (!currentFood || currentFood.foodID !== req.params.foodID) next()
    else {
      const violations = await validate(currentFood, this.validOptions)
      if (violations.length) {
        res.statusCode = 422 // Unprocessable Entity
        return violations
      } else {
        // save new drink over old one
        return await this.foodRepository.save(currentFood)
      }
    }
  }
}
