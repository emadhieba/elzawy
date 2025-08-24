export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  isNew?: boolean;
  isPopular?: boolean;
  rating?: number;
  preparationTime?: string;
  calories?: number;
  isFavorite?: boolean;
  ingredients?: string[];
  available: boolean;
}
