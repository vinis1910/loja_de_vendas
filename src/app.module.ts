import { Module } from '@nestjs/common';
import { ProdutoModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { APP_FILTER } from '@nestjs/core';
// import { GlobalExceptionFilter } from './filterException/global-exception-filter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProdutoModule,
    OrderModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    AuthModule,
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: GlobalExceptionFilter,
  //   }
  // ]
})
export class AppModule { }
