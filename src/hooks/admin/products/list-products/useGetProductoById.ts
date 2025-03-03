"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/admin/products/Product";

interface UseGetProductoByIdOptions {
  autoFetch?: boolean; // si queremos que se cargue inmediatamente
}

interface UseGetProductoByIdReturn {
  producto: Product | null;
  loading: boolean;
  error: Error | null;
  fetchData: (id: string) => void;
}

/**
 * GET /productos/:id
 */
export function useGetProductoById(
  id: string,
  { autoFetch = true }: UseGetProductoByIdOptions = {}
): UseGetProductoByIdReturn {
  const [producto, setProducto] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchData = async (prodId: string) => {
    if (!prodId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/productos/${prodId}`, {
        method: "GET",
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error obteniendo producto: ${text}`);
      }
      const data = await response.json();
      setProducto(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && id) {
      fetchData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, autoFetch]);

  return {
    producto,
    loading,
    error,
    fetchData,
  };
}
