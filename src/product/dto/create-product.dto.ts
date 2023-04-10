import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 50)
  title: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsInt()
  price: number;

  @IsInt()
  count: number;

  @IsBoolean()
  @IsOptional()
  offered?: boolean;
}
