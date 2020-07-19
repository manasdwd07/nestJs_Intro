import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}
    
    // @Post('login')
    // async login(){
        
    // }

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        console.log(req.body);
        return this.authService.login(req.body);
    }
}
