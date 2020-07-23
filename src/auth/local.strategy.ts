import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersService} from '../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('inside localstrategy.ts');
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException('Invalid credentials',HttpStatus.NOT_FOUND);
    }
    
    bcrypt.compare(password,user.password)
          .then((isMatch: any)=>{
            if(!isMatch) throw new HttpException('Invalid password, please try again',HttpStatus.NOT_FOUND)
            const {password,...result}=user;
            return result;
          })
    
    // if(user && user.password===password){
    //   const{password,...result}=user;
    //   return result;
    // }
    return null;
  }
}