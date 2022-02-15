import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must include at least 1 capital letter, 1 lower case letter and 1 number or special character.',
  })
  password: string;
}
