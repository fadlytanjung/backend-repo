export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  numberOfRents: number;
  recentlyActive: Date;
  totalAverageWeightRatings: number;
}