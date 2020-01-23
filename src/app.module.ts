import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { ApiModule } from './modules/api/api.module';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        MongooseModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                uri: config.get('mongo.connectionString'),
                useNewUrlParser: true,
            }),
            inject: [ConfigService],
        }),
        ApiModule,
    ],
})
export class AppModule {}
