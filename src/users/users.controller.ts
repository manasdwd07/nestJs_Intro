import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findUser(id);
    return user;
  }

  @Post('test')
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action tests a new user';
  }

  @Post()
  async registerUser(
    @Body() createUserDto:CreateUserDto,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
    @Body('phone') phone: number,
  ) {
    const result = await this.usersService.registerUser(
      name,
      email,
      password,
      confirmPassword,
      phone,
    );
    return 'User registered successfully';
  }
}
