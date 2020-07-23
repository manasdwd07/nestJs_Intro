import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService
        ){}

    validateUser=async(email:string,password:string):Promise<any>=>{
        console.log(
            'inside validateUser authService.ts'
        )
        // const user=await this.usersService.findOne(email);
        // console.log('user found ',user);
        // if(user && user.password === password){
        //     const {password,...result}=user;
        //     return result;
        // }
        // return null;
        let result=await this.usersService.authenticateUser(email,password);
        return result;

    }

    async login(user: any) {
        const payload = { email: user.email, password:user.password };
        // console.log(payload);
        return {
          access_token: this.jwtService.sign(payload)
        };
    }
}
