import { Test, TestingModule } from '@nestjs/testing';
import { Auth2Controller } from './auth2.controller';
import { Auth2Service } from './auth2.service';

describe('Auth2Controller', () => {
  let controller: Auth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Auth2Controller],
      providers: [Auth2Service],
    }).compile();

    controller = module.get<Auth2Controller>(Auth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
