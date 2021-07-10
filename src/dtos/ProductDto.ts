export interface IProduct {
  id?: number;
  nameProduct: string;
  price: number;
}


export interface IProductState {
  products: IProduct[];
  error: boolean | null;
  loading: boolean;
  deleteProduct: number | null;
  product: IProduct | null;
}