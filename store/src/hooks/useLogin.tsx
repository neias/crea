import { useMutation } from "react-query";
import { z } from "zod";

import ErrorSchema from "../types/Error";

const apiHost = process.env.API_HOST;

export const useLogin = (username, password) => {
  const mutation = useMutation(async () => {
    const res = await fetch(`${apiHost}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      throw { type: "invalidToken" };
    }

    return res.json();
  });

  const error = mutation.isError ? ErrorSchema.safeParse(mutation.error) : null;

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error,
  };
};
