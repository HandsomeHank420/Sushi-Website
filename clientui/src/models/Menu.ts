import { IsNotEmpty, IsOptional } from 'class-validator';
import Drink from '@/models/Drink';
import Food from '@/models/Food';

export default class Menu {
  @IsNotEmpty()
    // eslint-disable-next-line camelcase
  menuID!: number

  @IsNotEmpty()
  dayTimeMenu!: boolean

  @IsOptional()
  Food!: Food[]

  @IsOptional()
  Drink!: Drink[]
}
