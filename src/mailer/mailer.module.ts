import { Module } from "@nestjs/common";
import { MailerService1 } from "./mailer.service";
import { MailerController1 } from "./mailer.controller";

@Module({
    imports:[],
    controllers:[MailerController1],
    providers:[MailerService1],
    exports:[MailerService1]
})

export class MailerModule1 {}