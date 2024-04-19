import { IsNotEmpty, MaxLength } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import Menu from '@/models/Menu';

export default class Drink {
  drinkID!: string

  @MaxLength(25, { message: 'Item Name cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Item Name is required' })
  itemName!: string

  @MaxLength(244, { message: 'Item Description cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Item Description is required' })
  itemDescription!: string

  @IsNotEmpty({ message: 'Price is required' })
  price!: number

  menuID!: Menu
}
