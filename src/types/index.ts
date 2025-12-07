export type Restaurant = {
  id: string;
  name: string;
  description: string;
  images: string[];
};

export type VoteEntry = {
  name: string;
  restaurantId: string;
  time: string; // ISO
};