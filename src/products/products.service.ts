import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  // private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({
      title: title,
      description: description,
      price: price,
    });
    const result = await newProduct.save();
    // return prod
    return result._id as string;
  }

  async getAllProducts() {
    const products=await this.productModel.find().exec();
    return products.map((prod)=>({
        id:prod.id,
        title:prod.title,
        description:prod.description,
        price:prod.price
    }));
    
  }

  async getSingleProduct(productId: string) {
    const product =await this.findProduct(productId);
    return {id:product.id,title:product.title,description:product.description,price:product.price};
  }

  async updateSingleProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct=await this.findProduct(productId);
    
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
    return {
        id:updatedProduct.id,
        title:updatedProduct.title,
        description:updatedProduct.description,
        price:updatedProduct.price
    };
  }

  async deleteProduct(productId: string) {
    try{
        const result=await this.productModel.findByIdAndDelete(productId).exec();
    
    }
    catch(error){
        throw new NotFoundException('Could not find this product');
    }
  }

   private async findProduct(productId: string):Promise<Product> {
    let product;
    try{
        product=await this.productModel.findById(productId);
    }
    catch(error){
        throw new NotFoundException('Could not find this product');
    }
    if (!product) {
      throw new NotFoundException('Could not find this product');
    }
    return product;
  }
}
