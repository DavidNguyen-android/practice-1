import { useMemo, useState } from 'react';
import { useDeleteProduct } from '../../hooks/useProducts';
import type { Product, ProductFilters } from '../../types/product';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete?: () => void;
}

export const ProductList = ({
  products,
  onEdit,
  onDelete,
}: ProductListProps) => {
  const deleteProduct = useDeleteProduct();
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Sort
    result.sort((a, b) => {
      let aValue: number | string = a[filters.sortBy];
      let bValue: number | string = b[filters.sortBy];

      if (filters.sortBy === 'price' || filters.sortBy === 'stock') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }, [products, filters]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct.mutate(id, onDelete);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  return (
    <div className="product-list">
      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value as ProductFilters['sortBy'],
              })
            }
            className="filter-select"
          >
            <option value="createdAt">Date</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </div>

        <div className="filter-group">
          <button
            onClick={() =>
              setFilters({
                ...filters,
                sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
              })
            }
            className="btn-sort"
          >
            {filters.sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>
      </div>

      <div className="products-count">
        Showing {filteredAndSortedProducts.length} of {products.length} products
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-products">
                  No products found
                </td>
              </tr>
            ) : (
              filteredAndSortedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>
                  <td className="product-description">{product.description}</td>
                  <td className="product-price">${product.price.toFixed(2)}</td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className={product.stock < 20 ? 'low-stock' : ''}>
                    {product.stock}
                  </td>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button
                      onClick={() => onEdit(product)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
