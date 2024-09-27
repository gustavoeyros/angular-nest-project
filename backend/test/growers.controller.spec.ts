import { Test, TestingModule } from '@nestjs/testing';
import { GrowersController } from '../src/modules/growers/controllers/growers.controller';
import { GrowersService } from '../src/modules/growers/services/growers.service';
import { Grower } from '../src/modules/growers/entities/grower.entity';

describe('GrowersController', () => {
  let controller: GrowersController;
  let service: GrowersService;

  const mockGrowersService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Test Grower' }]),
    create: jest.fn().mockResolvedValue({ id: '1', name: 'Test Grower' }),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrowersController],
      providers: [
        {
          provide: GrowersService,
          useValue: mockGrowersService,
        },
      ],
    }).compile();

    controller = module.get<GrowersController>(GrowersController);
    service = module.get<GrowersService>(GrowersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all growers', async () => {
    const result = await controller.findAll();
    expect(result).toEqual({
      message: 'success',
      data: [{ id: '1', name: 'Test Grower' }],
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a grower', async () => {
    const grower: Grower = {
      name: 'Test Grower',
      address: '',
      email: '',
      phone: '',
      specialty: '',
    };
    const result = await controller.create(grower);
    expect(result).toEqual({
      message: 'success',
      data: { id: '1', name: 'Test Grower' },
    });
    expect(service.create).toHaveBeenCalledWith(grower);
  });

  it('should update a grower', async () => {
    const grower: Grower = {
      name: 'Updated Grower',
      address: '',
      email: '',
      phone: '',
      specialty: '',
    };
    const result = await controller.update('1', grower);
    expect(result).toEqual({
      message: 'success',
      data: { id: '1', ...grower },
    });
    expect(service.update).toHaveBeenCalledWith('1', grower);
  });

  it('should delete a grower', async () => {
    const result = await controller.delete('1');
    expect(result).toEqual({ message: 'success', data: { id: '1' } });
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
