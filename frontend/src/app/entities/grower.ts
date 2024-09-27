export interface Grower {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  specialty: string;
}

export interface GrowerApiResponse {
  message: string;
  data: Grower[];
}
