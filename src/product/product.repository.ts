import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { readFile } from 'fs/promises';

@Injectable()
export class ProductRepository {
  async findAll() {
    const productsText = await readFile('db.json', 'utf-8');

    const products = JSON.parse(productsText);

    return products;
  }

  async findOne(slug: string) {
    const productsText = await readFile('db.json', 'utf-8');

    const products = JSON.parse(productsText);

    return products.find((item) => item.slug === slug);
  }

  create(product: CreateProductDto) {}
}
