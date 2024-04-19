import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty, MaxLength } from 'class-validator'
import { Menu } from './Menu'

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
    foodID: string

  @Column({ type: 'nvarchar', length: 25, nullable: false })
  @MaxLength(100, { message: 'Item Name cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Item Name is required' })
    itemName: string

  @Column({ type: 'nvarchar', length: 144, nullable: false })
  @MaxLength(144, { message: 'Item Description cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Item Description is required' })
    itemDescription: string

  @Column({ type: 'nvarchar', length: 15, nullable: false })
  @MaxLength(15, { message: 'Item Type cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Item Type is required' })
    itemType: string

  @Column({ type: 'integer', nullable: false })
  @IsNotEmpty({ message: 'Item Type is required' })
    price: number

  @ManyToOne(() => Menu, (menu) => menu.Food)
    menu_id: Menu
}
