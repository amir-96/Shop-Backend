import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  @Length(8, 50)
  password: string;
}
