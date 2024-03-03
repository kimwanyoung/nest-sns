import {
  CanActivate,
  ExecutionContext, Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { BasicTokenGuard } from './basic-token.guard';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const rawToken = request.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const result = await this.authService.verifyToken(token);
    const user = await this.usersService.getUserByEmail(result.email);
    /**
     * request에 넣을 정보
     * 1) 사용자 정보
     * 2) token
     * 3) token type - refresh | access
     */
    request.user = user;
    request.token = token;
    request.tokenType = result.type;
    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BasicTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();

    if (request.tokenType != 'access') {
      throw new UnauthorizedException('accessToken이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BasicTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();

    if (request.tokenType != 'refresh') {
      throw new UnauthorizedException('accessToken이 아닙니다.');
    }

    return true;
  }
}
