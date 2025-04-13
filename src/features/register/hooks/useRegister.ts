import { useState, useCallback } from "react";
import { registerUser } from "../services/authApi";

interface RegisterState {
  loading: boolean;
  error: string | null;
  data: any | null;
}

export const useRegister = () => {
  const [state, setState] = useState<RegisterState>({
    loading: false,
    error: null,
    data: null,
  });

  const register = useCallback(async (email: string, password: string) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await registerUser({ email, password });
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
            : "An error occurred during registration",
        data: null,
      });
    }
  }, []);

  return {
    register,
    loading: state.loading,
    error: state.error,
    data: state.data,
  };
};
