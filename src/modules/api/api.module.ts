import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';
import { PageViewSchema } from './schemas';
import { PageViewService} from './services';
import { API_CONTROLLERS } from './controllers';

@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt-api' }),
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => config.get('jwt-api'),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: 'PageView', schema: PageViewSchema },
        ]),
    ],
    controllers: [...API_CONTROLLERS],
    providers: [
        PageViewService
    ],
    exports: [
    ],
})
export class ApiModule { }
