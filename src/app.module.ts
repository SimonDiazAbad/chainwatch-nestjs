import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalancesModule } from './api/v1/balances/balances.module';
import { AppConfigModule } from './modules/app-config/app-config.module';

@Module({
    imports: [
        BalancesModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.development.local', '.env.development'],
        }),
        AppConfigModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
        { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    ],
})
export class AppModule {}
