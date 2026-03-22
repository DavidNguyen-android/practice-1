import { useCallback, useEffect, useState } from 'react';
import type { ProductFormData } from '../schemas/productSchema';
import { productService } from '../services/productService';
import type { Product } from '../types/product';

export const useProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const products = await productService.getProducts();
      setData(products);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return { data, isLoading, error, refetch: fetchProducts };
};

export const useProduct = (id: string) => {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const product = await productService.getProduct(id);
        setData(product);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { data, isLoading, error };
};

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (product: ProductFormData, onSuccess?: () => void) => {
    try {
      setIsLoading(true);
      setError(null);
      await productService.createProduct(product);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (
    { id, product }: { id: string; product: ProductFormData },
    onSuccess?: () => void
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      await productService.updateProduct(id, product);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const useDeleteProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, onSuccess?: () => void) => {
    try {
      setIsLoading(true);
      setError(null);
      await productService.deleteProduct(id);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};
