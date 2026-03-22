import type { ProductFormData } from "../schemas/productSchema";

export interface Product extends ProductFormData {
  id: string;
  createdAt: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  sortBy: 'name' | 'price' | 'stock' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}
