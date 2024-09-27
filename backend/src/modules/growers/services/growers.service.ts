import { Inject, Injectable, Logger } from '@nestjs/common';
import { Grower } from '../entities/grower.entity';
import { CollectionReference } from '@google-cloud/firestore';
import { GrowerApiResponse } from './grower.service.interface';

@Injectable()
export class GrowersService {
  private logger: Logger = new Logger(GrowersService.name);

  constructor(
    @Inject(Grower.collectionName)
    private growersCollection: CollectionReference<Grower>,
  ) {}

  async create({
    name,
    address,
    email,
    phone,
    specialty,
  }: Grower): Promise<GrowerApiResponse> {
    try {
      const docRef = await this.growersCollection.add({
        name,
        address,
        email,
        phone,
        specialty,
      });
      const growerDoc = await docRef.get();
      const grower = growerDoc.data();
      this.logger.log(`Grower created successfully with ID: ${docRef.id}`);
      return { id: docRef.id, ...grower };
    } catch (error) {
      this.logger.error('Error creating grower', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<GrowerApiResponse[]> {
    try {
      const snapshot = await this.growersCollection.get();
      const growers: GrowerApiResponse[] = [];
      snapshot.forEach((doc) => growers.push({ id: doc.id, ...doc.data() }));
      this.logger.log(`Fetched ${growers.length} growers successfully`);
      return growers;
    } catch (error) {
      this.logger.error('Error fetching growers', error.stack);
      throw error;
    }
  }

  async update(id: string, grower: Grower): Promise<void> {
    try {
      await this.growersCollection.doc(id).update({ ...grower });
      this.logger.log(`Grower with ID: ${id} updated successfully`);
    } catch (error) {
      this.logger.error(`Error updating grower with ID: ${id}`, error.stack);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.growersCollection.doc(id).delete();
      this.logger.log(`Grower with ID: ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Error deleting grower with ID: ${id}`, error.stack);
      throw error;
    }
  }
}
