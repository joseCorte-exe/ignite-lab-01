import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';
import { Product } from '../http/graphql/models/product';

type CreateProductParams = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  listAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug)
      throw new Error('Another product with same slug alredy exist');

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
