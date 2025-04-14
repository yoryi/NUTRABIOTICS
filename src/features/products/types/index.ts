import { Product } from "../services/productsApi";

export interface ProductsState {
  loading: boolean;
  error: string | null;
  data: Product[] | null;
}
