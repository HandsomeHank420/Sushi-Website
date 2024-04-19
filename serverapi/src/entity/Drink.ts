import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty, MaxLength } from 'class-validator'
import { Menu } from './Menu'

// can change id string back to number if need be
@Entity()
export class Drink {
  @PrimaryGeneratedColumn('uuid')
    drinkID: string

  @Column({ type: 'nvarchar', length: 25, nullable: false })
  @MaxLength(25, { message: 'Item Name cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Item Name is required' })
    itemName: string

  @Column({ type: 'nvarchar', length: 144, nullable: false })
  @MaxLength(144, { message: 'Item Description cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Item Description is required' })
    itemDescription: string

  @Column({ type: 'integer', nullable: false })
  @IsNotEmpty({ message: 'Item Type is required' })
    price: number

  // eager goes after menu.Drink look up
  @ManyToOne(() => Menu, (menu) => menu.Drink)
    menu_id: Menu
}
