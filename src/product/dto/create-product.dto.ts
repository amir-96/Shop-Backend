import { IsString, Length, IsInt, Min, Max } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 40)
  title: string;

  @IsString()
  image: string;

  @IsString()
  @Length(8)
  description: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  slug: string;

  @IsInt()
  @Min(0)
  count: number;

  offered?: boolean;
}
