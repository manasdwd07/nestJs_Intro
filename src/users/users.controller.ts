import { Controller, Post, Body, Get,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(){
      const users=await this.usersService.getAllUsers();
      return users;
  }

  @Post()
  async registerUser(
      @Body('name') name:string,
      @Body('email') email:string,
      @Body('password') password:string,
      @Body('confirmPassword') confirmPassword:string,
      @Body('phone') phone:number
  ){
    const result=await this.usersService.registerUser(
        name,
        email,
        password,
        confirmPassword,
        phone
    )
    return 'User registered successfully';
  }
}
