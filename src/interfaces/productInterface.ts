export interface IProduct {
  id: string;
  name: string;
  description?: string; // 👈 opcional
  color?: string; // 👈 opcional también
  categoryId: string;
  category?: TCategory; // 👈 opcional
  price: number;
  stock: number;
  imgs?: string[];
  onSale?: boolean;
  priceOnSale?: number;
  size?: string;
  available?: boolean;
}

export type TCategory = {
  id: string;
  name: string;
  categoryImage?: string;
  products?: IProduct[];
};
