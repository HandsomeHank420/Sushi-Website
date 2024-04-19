import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length, Matches, MaxLength } from 'class-validator'

const emailOptions = {
  allow_display_name: false,
  ignore_max_length: false,
  allow_ip_domain: false,
  domain_specific_validation: true
}

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
    personID: string

  @Column({ type: 'nvarchar', length: 35, nullable: false })
  @MaxLength(35, { message: 'Username cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
    username: string

  @Column()
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain uppercase, lowercase, and numbers' }
  )
  @Length(8, 25, { message: 'Password must be from $constraint1 to $constraint2 characters ' })
  @IsNotEmpty({ message: 'Password is Required' })
    password!: string

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  @MaxLength(20, { message: 'First Name cannot be longer than $constraint1 characters long' })
  @IsOptional()
    firstName: string

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  @MaxLength(25, { message: 'Last Name cannot be longer than $constraint1 characters long' })
  @IsOptional()
    lastName: string

  @Column({ type: 'nvarchar', length: 35, nullable: true })
  @MaxLength(35, { message: 'Address cannot be longer than $constraint1 characters long' })
  @IsOptional()
    address: string

  @Column({ type: 'nvarchar', length: 244, nullable: true })
  @MaxLength(244, { message: 'Phone Number cannot be longer than $constraint1 characters long' })
  @IsOptional()
    comments: string

  @Column({ type: 'nvarchar', nullable: true })
  @Length(7, 17, { message: 'Phone number must be between 7 and 17 digits long' })
  @IsPhoneNumber('CA', { message: 'Phone Number Must be a valid Canadian format' })
  @IsOptional()
    phone: string

  @Column({ type: 'varchar', length: 320, nullable: true })
  @IsEmail(emailOptions, { message: 'Email must be in the proper format' })
  @IsOptional()
    email: string // serves as username
}
