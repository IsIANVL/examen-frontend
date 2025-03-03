"use client";

import { useState } from "react";
import { Product } from "@/types/admin/products/Product";

export function useAddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const addProduct = async (payload: Product): Promise<Product> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error al crear producto: ${text}`);
      }
      const data = await response.json();
      // data = nuevoProducto
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, loading, error };
}
