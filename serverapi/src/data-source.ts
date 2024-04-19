import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Drink } from './entity/Drink'
import { Food } from './entity/Food'
import { Menu } from './entity/Menu'
import { Person } from './entity/Person'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'sqlite.db',
  synchronize: true,
  logging: false,
  entities: [Drink, Food, Menu, Person],
  migrations: [],
  subscribers: []
})
