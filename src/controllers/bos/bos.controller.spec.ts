import { Test, TestingModule } from '@nestjs/testing';
import { BosController } from './bos.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BosController],
    }).compile();

    controller = module.get<BosController>(BosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
