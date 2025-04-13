import { useState, useCallback } from "react";
import { getProducts, Product } from "../services/productsApi";

interface ProductsState {
  loading: boolean;
  error: string | null;
  data: Product[] | null;
}

export const useProducts = () => {
  const [state, setState] = useState<ProductsState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchProducts = useCallback(async () => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await getProducts();
      setState({
        loading: false,
        error: null,
        data,
      });
    } catch (error) {
      setState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while fetching products",
        data: null,
      });
    }
  }, []);

  return {
    fetchProducts,
    loading: state.loading,
    error: state.error,
    data: state.data,
  };
};
