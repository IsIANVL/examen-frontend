"use client";

import { useState } from "react";
import { Product } from "@/types/admin/products/Product";

export interface ProductsFilters {
  descuento?: boolean;
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
  sortOrder?: string;
  // etc, ajusta a tu gusto
}

export function useGetProductsFilters() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchFiltered = async (filters: ProductsFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/productos/filters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${text}`);
      }
      const data = await response.json(); 
      setProducts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchFiltered,
  };
}
