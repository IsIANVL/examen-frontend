"use client";

import { useState } from "react";

export function useDeleteProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const deleteProduct = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/productos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error al eliminar: ${text}`);
      }
      // si el backend retorna 204, no hay body. Perfecto.
      // No devolvemos nada, asumimos true
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
}
