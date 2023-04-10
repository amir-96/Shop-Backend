import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'prisma/prisma.service';
import { IProduct } from './interfaces/product';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  // Get product info
  async getAllProducts(): Promise<CreateProductDto[]> {
    const allProducts = await this.prismaService.product.findMany();
    return allProducts;
  }

  async getProductBySlug(slug: string): Promise<CreateProductDto> {
    const product = await this.prismaService.product.findUnique({
      where: {
        slug: slug.toLowerCase(),
      },
    });

    return product;
  }

  // Create product
  async createProduct(product: CreateProductDto) {
    const isProduct = await this.prismaService.product.findUnique({
      where: {
        slug: product.slug,
      },
    });

    if (!isProduct) {
      try {
        await this.prismaService.product.create({
          data: {
            title: product.title,
            image: product.image,
            description: product.description,
            slug: product.slug,
            price: product.price,
            count: product.count,
            offered: product.offered,
          },
        });
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  // Update product

  async updateProduct(
    product: UpdateProductDto,
    slug: string,
  ): Promise<boolean> {
    try {
      await this.prismaService.product.update({
        where: {
          slug: slug.toLowerCase(),
        },
        data: {
          title: product.title,
          image: product.image,
          description: product.description,
          price: product.price,
          count: product.count,
          offered: product.offered,
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  // Delete product

  async deleteProduct(slug: string): Promise<boolean> {
    try {
      await this.prismaService.product.delete({
        where: {
          slug: slug.toLowerCase(),
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
