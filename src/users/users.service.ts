import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from './users.model';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class UsersService {


    constructor( @InjectModel('User') private readonly userModel:Model<User>){}

    registerUser=async (name:string,email:string,password:string,confirmPassword:string,phone:number)=>{
        
        const user=await this.userModel.findOne({email});
        if(user){
            throw new HttpException('User with this email id already exists',HttpStatus.NOT_FOUND)
        }
        
        const newUser=new this.userModel({
            name:name,
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            phone:phone

        });
        await newUser.save();
        return null
    } 
    
    getAllUsers=async()=>{
        const users=await this.userModel.find().exec();
        return users.map((user)=>({
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone
        }));
    }

    findOne=async(email:string)=>{
        const user= this.userModel.findOne({email});
        if(!user){
            throw new HttpException('Invalid credentials',HttpStatus.NOT_FOUND)
        }
        return user;
    }
}
