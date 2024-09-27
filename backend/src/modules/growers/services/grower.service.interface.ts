import { Grower } from '../entities/grower.entity';

export interface GrowerApiResponse extends Grower {
  id: string;
}
