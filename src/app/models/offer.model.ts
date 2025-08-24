export interface Offer {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  image: string;
  validUntil: string;
  isLimited?: boolean;
  itemsLeft?: number;
  terms?: string[];
}
