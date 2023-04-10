import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('/api/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts() {
    const allProducts = await this.productService.getAllProducts();
    return allProducts;
  }

  @Get('/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    const product = await this.productService.getProductBySlug(slug);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productService.createProduct(body);
    return product;
  }

  @Put('/:slug')
  async updateProduct(
    @Body() body: UpdateProductDto,
    @Param('slug') slug: string,
  ): Promise<boolean> {
    const updatedProduct = await this.productService.updateProduct(body, slug);

    return updatedProduct;
  }

  @Delete('/:slug')
  async deleteProduct(@Param('slug') slug: string): Promise<boolean> {
    const deletedProduct = await this.productService.deleteProduct(slug);

    return deletedProduct;
  }
}
