import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {MulterModule} from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule1 } from './mailer/mailer.module';
require('dotenv').config();


@Module({
  imports: [ProductsModule,
    UsersModule,
    MailerModule1,
    AuthModule,
    MailerModule.forRoot({
      transport: process.env.MAILER_TRANSPORT,
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      }
    }),
    MulterModule.register({dest:'./uploads'}),
    MongooseModule.forRoot(
      process.env.MONGODB_URI
      ),
    
    ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
