import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { Person } from '../entity/Person'

/**
 * Person controller
 */
@Controller('/person')
export default class PersonController {
  // get repository for the person
  private readonly personRepository = AppDataSource.getRepository(Person)
  private readonly validOptions: ValidatorOptions = {
    stopAtFirstError: true,
    skipMissingProperties: false,
    validationError: { target: false, value: false }
  }

  /**
   * get all method
   */
  @Route('get')
  async all (req: Request, res: Response, next: NextFunction): Promise<Person | Person[]> {
    return await this.personRepository.find()
  }

  /**
   *get method
   */
  // may need to change this id to personID not sure
  @Route('get', '/:personID')
  async read (req: Request, res: Response, next: NextFunction): Promise<Person | Person[]> {
    if (req.params.personID) {
      return await this.personRepository.findOneBy({ personID: req.params.personID })
    }
  }

  /**
   * post method
   */
  @Route('post')
  async save (req: Request, res: Response, next: NextFunction): Promise<any> {
    // const for a person object that we can use to transform whats in the body to a new person
    const personToAdd = Object.assign(new Person(), req.body)
    // check if person is valid
    const violations = await validate(personToAdd, this.validOptions)
    // if not valid send 422 statuscode
    if (violations.length) {
      res.statusCode = 422
      return violations
    } else {
      // if valid save to repository send back 201
      res.statusCode = 201
      return await this.personRepository.save(personToAdd)
    }
  }

  /**
   * delete method
   */
  @Route('delete', '/:personID')
  async remove (req: Request, res: Response, next: NextFunction): Promise<any> {
    // grab out the person to remove and send a successful statuscode
    const PersonToRemove = await this.personRepository.findOneBy({ personID: req.params.personID })
    // if not we can remove the person
    return await this.personRepository.remove(PersonToRemove)
  }

  /**
   * put method
   *
   */
  @Route('put', '/:personID')
  async update (req: Request, res: Response, next: NextFunction): Promise<Person | ValidationError[] | Number> {
    // search for that person
    const currentPerson = await this.personRepository.preload(req.body)

    // pass the buck if no currentPerson found or the ID's dont match the params ID
    if (!currentPerson || currentPerson.personID !== req.params.personID) next()
    else {
      const violations = await validate(currentPerson, this.validOptions)
      if (violations.length) {
        res.statusCode = 422 // Unprocessable Entity
        return violations
      } else {
        // save new person over old one
        return await this.personRepository.save(currentPerson)
      }
    }
  }
}
