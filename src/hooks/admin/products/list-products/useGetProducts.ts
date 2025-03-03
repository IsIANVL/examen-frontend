"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/admin/products/Product";

/**
 * GET /productos
 */

interface UseGetProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useGetProducts(): UseGetProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/productos`, {
        method: "GET",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error: ${text}`);
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refetch,
  };
}
