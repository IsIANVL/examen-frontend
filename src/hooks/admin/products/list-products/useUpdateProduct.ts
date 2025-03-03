"use client";

import { useState } from "react";
import { Product } from "@/types/admin/products/Product";

export function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const updateProduct = async (producto: Product): Promise<Product> => {
    if (!producto.id) {
      throw new Error("No se puede actualizar un producto sin ID");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/productos/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error al actualizar: ${text}`);
      }
      const data = await response.json();
      return data; // data es el producto actualizado
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
}
