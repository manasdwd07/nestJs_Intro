import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService1 {
  constructor(private readonly mailerService: MailerService) {}
  
  public sendEmail(email:string): any {
    this
      .mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'iammanasdwd@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'Hey, I just learnt how to send an email using multer in Nest.js', // plaintext body
        html: '<b>Hey, I just learnt how to send an email using multer in Nest.js</b>', // HTML body content
      })
      .then((response) => {
          console.log(response);
          return response;
      })
      .catch((error) => {
          console.log(error);
      });
  }
  
}