import {
  IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length, Matches, MaxLength,
} from 'class-validator';

// kept matches incase we want to do a password
const emailOptions = {
  allow_display_name: false,
  ignore_max_length: false,
  allow_ip_domain: false,
  // additional validation, e.g. disallowing certain valid emails that are rejected by GMail.
  domain_specific_validation: true,
};

export default class Person {
  // eslint-disable-next-line camelcase
  personID!: string

  @MaxLength(35, { message: 'Username cannot be longer than $constraint1 characters long' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
    username!: string

  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain uppercase, lowercase, and numbers' },
  )
  @Length(8, 25, { message: 'Password must be from $constraint1 to $constraint2 characters ' })
  @IsNotEmpty({ message: 'Password is Required' })
  password!: string

  @MaxLength(20, { message: 'First Name cannot be longer than $constraint1 characters long' })
  @IsOptional()
  firstName!: string

  @MaxLength(25, { message: 'Last Name cannot be longer than $constraint1 characters long' })
  @IsOptional()
  lastName!: string

  @MaxLength(35, { message: 'Address cannot be longer than $constraint1 characters long' })
  @IsOptional()
  address!: string

  @MaxLength(244, { message: 'Phone Number cannot be longer than $constraint1 characters long' })
  @IsOptional()
  comments!: string

  @Length(7, 17, { message: 'Phone number must be between 7 and 17 digits long' })
  @IsPhoneNumber('CA', { message: 'Phone Number Must be a valid Canadian format' })
  @IsOptional()
  phone!: string

  @IsEmail(emailOptions, { message: 'Email must be in the proper format' })
  @IsOptional()
  email!: string // serves as username
}
