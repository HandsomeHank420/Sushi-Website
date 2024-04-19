import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Food } from './Food'
import { Drink } from './Drink'

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
    menu_id: number

  @Column({ type: 'boolean', nullable: false })
    dayTimeMenu: boolean

  @OneToMany(() => Food, (food) => food.menu_id, {
    eager: true
  })
    Food: Food[]

  @OneToMany(() => Drink, (drink) => drink.menu_id, {
    eager: true
  })
    Drink: Drink[]
}
