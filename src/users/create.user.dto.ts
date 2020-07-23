import {
  IsEmail,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsAlphanumeric,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Match } from './match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Matches(
    /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])(?!.*[iIoO])\S{6,12}$/,
    {
      message:
        'Password must contain atleast one uppercase and one lowercase char| must contains one digit from 0-9 | must contain one special symbols in this list $ and @. | must match any character except i I o and O | length at least 6 characters and a maximum of 12',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Password and confirm password do not match' })
  confirmPassword: string;

  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  phone: number;
}
