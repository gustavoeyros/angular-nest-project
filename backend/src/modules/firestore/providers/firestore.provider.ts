import { Grower } from 'src/modules/growers/entities/grower.entity';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [Grower.collectionName];
