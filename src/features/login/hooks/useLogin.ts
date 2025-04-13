import { useState, useCallback } from "react";
import { loginUser } from "../services/authApi";

interface LoginState {
  loading: boolean;
  error: string | null;
  data: any | null;
}

export const useLogin = () => {
  const [state, setState] = useState<LoginState>({
    loading: false,
    error: null,
    data: null,
  });

  const login = useCallback(async (email: string, password: string) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await loginUser({ email, password });
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
            : "An error occurred during login",
        data: null,
      });
    }
  }, []);

  return {
    login,
    loading: state.loading,
    error: state.error,
    data: state.data,
  };
};
