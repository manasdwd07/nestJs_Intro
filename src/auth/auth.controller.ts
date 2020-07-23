import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {MailerService1} from '../mailer/mailer.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService , private readonly mailService:MailerService1){}
    
    // @Post('login')
    // async login(){
    // }

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        console.log(req.body);
        return this.authService.login(req.body);
    }

    @Post('forgotPassword')
    async sendResetLink(@Body('email') email){
        const result=await this.mailService.sendEmail(email);
        return 'Reset link sent!! Check email'
    }
}
