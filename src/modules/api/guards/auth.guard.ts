import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const checkAuth = request.headers.authorization;
        if(checkAuth != undefined && checkAuth == ConfigService.get('settings.authToken')){
            return true;
        } else {
            throw new UnauthorizedException();
        }
    }
}