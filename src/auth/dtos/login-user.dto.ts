import { IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Length(2, 50)
  userName: string;

  @IsString()
  @Length(8, 50)
  password: string;
}
