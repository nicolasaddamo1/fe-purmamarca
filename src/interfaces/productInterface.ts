export interface IProduct {
  id: string;
  name: string;
  description?: string;
  color?: string;
  categoryId: string;
  price: number;
  stock: number;
  size?: string;
  onSale?: boolean;
  available?: boolean;
  imgs?: string[];
  priceOnSale?: number;
}

export type TCategory = {
  id: string;
  name: string;
  categoryImage?: string;
  products?: IProduct[];
};
