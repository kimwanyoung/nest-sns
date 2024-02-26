import { Controller } from '@nestjs/common';
import { Auth2Service } from './auth2.service';

@Controller('auth2')
export class Auth2Controller {
  constructor(private readonly auth2Service: Auth2Service) {}
}
