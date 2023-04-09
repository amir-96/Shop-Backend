import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productsRepository: ProductRepository) {}

  getAllProducts() {
    return this.productsRepository.findAll();
  }

  createProduct() {
    return 'test';
  }
}
