import { api } from '../lib/api';
import type { ProductFormData } from '../schemas/productSchema';
import type { Product } from '../types/product';

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Create new product
  createProduct: async (product: ProductFormData): Promise<Product> => {
    const newProduct = {
      ...product,
      createdAt: new Date().toISOString(),
    };
    const response = await api.post<Product>('/products', newProduct);
    return response.data;
  },

  // Update existing product
  updateProduct: async (
    id: string,
    product: ProductFormData
  ): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
