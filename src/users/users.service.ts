import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  registerUser = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: number,
  ) => {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException(
        'User with this email id already exists',
        HttpStatus.NOT_FOUND,
      );
    }

    const newUser =  new this.userModel({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
    });

    bcrypt.hash(newUser.password,10,async(err,hash)=>{
        if (err) throw err;

        newUser.password=hash;
        newUser.confirmPassword=hash;

        await newUser.save();
        return null;

    })

    // bcrypt.hash(newUser.password,async(err,hash)=>{
    //     if(err) throw err;

    //     newUser.password=hash;
    //     newUser.confirmPassword=hash;

    //     await newUser.save();
    //     return null;
    // })

    // bcrypt.hash(newUser.password, async (err, hash) => {
    //   if (err) throw err;

    //   newUser.password = hash;
    //   newUser.confirmPassword = hash;

    //   await newUser.save();
    //   return null;
    // });
    // await newUser.save();
    // return null;
  };

  getAllUsers = async () => {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }));
  };

  authenticateUser = async (email: string, password: string) => {
    try {
      const user = await this.userModel.findOne({ email });

      if (user) {
        // const {password,...result}=user;
        // return result;
        return user;
      }
      return null;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  };

  findOne = async (email: string) => {
    console.log('inside users service');
    const user = this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    }
    return user;
  };

  findUser = async id => {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    }
    return user;
  };
}
