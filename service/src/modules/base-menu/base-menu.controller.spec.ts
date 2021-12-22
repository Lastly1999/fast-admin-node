import { Test, TestingModule } from '@nestjs/testing';
import { BaseMenuController } from './base-menu.controller';

describe('BaseMenuController', () => {
  let controller: BaseMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseMenuController],
    }).compile();

    controller = module.get<BaseMenuController>(BaseMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
