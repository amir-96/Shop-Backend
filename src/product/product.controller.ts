import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('/api/products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Get()
  find() {
    return this.productsService.getAllProducts();
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    console.log(product);
  }
}
