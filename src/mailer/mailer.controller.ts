import { Controller, Body ,Post} from "@nestjs/common";
import {MailerService1} from './mailer.service'

@Controller('mail')
export class MailerController1{
    constructor(private readonly mailservice:MailerService1){}

    @Post()
    async sendMail(
        @Body('email') email:string
    ){
        const response=await this.mailservice.sendEmail(email);
        return 'Mail sent successfully !!';
    }
}