import { Controller, Get } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

@Controller('user')
export class UserController {
  constructor(private productService: ProductService) {}

  @Get()
  find() {
    return this.productService.getAllProducts();
  }
}
