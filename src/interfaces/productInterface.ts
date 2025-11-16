export interface IProduct {
  id: string;
  name: string;
  description?: string;
  color?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    categoryImage: null;
  };
  price: number;
  stock: number;
  size?: string;
  onSale?: boolean;
  available?: boolean;
  imgs?: string[];
  priceOnSale?: number;
  promotion: {
    name: string;
    promo_percentage: number | null;
    start_date: Date;
    expiration_date: Date;
  } | null;
}

export type TCategory = {
  id: string;
  name: string;
  categoryImage?: string;
  products?: IProduct[];
};
