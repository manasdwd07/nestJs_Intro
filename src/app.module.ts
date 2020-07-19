import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://manasdwd:abcdefgh@cluster0.drp6k.gcp.mongodb.net/testNest?retryWrites=true&w=majority'
      ),
    
    ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
