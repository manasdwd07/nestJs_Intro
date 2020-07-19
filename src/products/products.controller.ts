import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      productTitle,
      description,
      price,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  

  @Get(':id')
  async getSingleProduct(@Param('id') productId: string) {
    const product = await this.productsService.getSingleProduct(productId);
    return product;
  }

  @Patch(':id')
  async updateSingleProduct(
    @Param('id') productId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const result = await this.productsService.updateSingleProduct(
      productId,
      title,
      description,
      price,
    );
    return result;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    await this.productsService.deleteProduct(productId);
    return 'Product has been deleted successfullly';
  }
}
