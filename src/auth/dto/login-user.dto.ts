import { IsString, Validate, Length, IsEmail } from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: false,
  mustContainUpperLetter: true,
};

export class LoginUserDto {
  @IsString()
  @Length(4)
  username: string;

  @IsString()
  @Length(8)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
}
