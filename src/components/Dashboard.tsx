import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/product';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';

export const Dashboard = () => {
  const { data: products, isLoading, error, refetch } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );

  const handleAddNew = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(undefined);
    refetch();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error">
          Error loading products:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
          <br />
          <small>Make sure JSON Server is running on port 3001</small>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Product Management Dashboard</h1>
        <button onClick={handleAddNew} className="btn-primary">
          + Add New Product
        </button>
      </header>

      {showForm && (
        <div className="modal-overlay" onClick={handleFormCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProductForm
              product={editingProduct}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {products && (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={refetch}
        />
      )}
    </div>
  );
};
