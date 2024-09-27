import { Test, TestingModule } from '@nestjs/testing';
import { GrowersService } from '../src/modules/growers/services/growers.service';
import { Grower } from '../src/modules/growers/entities/grower.entity';

describe('GrowersService', () => {
  let service: GrowersService;

  const mockGrowersCollection = {
    add: jest.fn().mockResolvedValue({
      id: '1',
      get: jest.fn().mockResolvedValue({
        data: jest.fn().mockReturnValue({ name: 'Test Grower' }),
      }),
    }),
    get: jest.fn().mockResolvedValue({
      forEach: jest.fn((callback) => {
        callback({
          id: '1',
          data: jest.fn().mockReturnValue({ name: 'Test Grower' }),
        });
      }),
    }),
    doc: jest.fn().mockReturnValue({
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrowersService,
        {
          provide: Grower.collectionName,
          useValue: mockGrowersCollection,
        },
      ],
    }).compile();

    service = module.get<GrowersService>(GrowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a grower', async () => {
    const grower: Grower = {
      name: 'Test Grower',
      address: '',
      email: '',
      phone: '',
      specialty: '',
    };
    const result = await service.create(grower);
    expect(result).toEqual({ id: '1', name: 'Test Grower' });
    expect(mockGrowersCollection.add).toHaveBeenCalledWith(grower);
  });

  it('should return all growers', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: '1', name: 'Test Grower' }]);
    expect(mockGrowersCollection.get).toHaveBeenCalled();
  });

  it('should update a grower', async () => {
    const grower: Grower = {
      name: 'Updated Grower',
      address: '',
      email: '',
      phone: '',
      specialty: '',
    };
    await service.update('1', grower);
    expect(mockGrowersCollection.doc).toHaveBeenCalledWith('1');
    expect(mockGrowersCollection.doc('1').update).toHaveBeenCalledWith(grower);
  });

  it('should delete a grower', async () => {
    await service.delete('1');
    expect(mockGrowersCollection.doc).toHaveBeenCalledWith('1');
    expect(mockGrowersCollection.doc('1').delete).toHaveBeenCalled();
  });
});
