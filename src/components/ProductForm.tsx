import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateProduct, useUpdateProduct } from '../hooks/useProducts';
import { productSchema, type ProductFormData } from '../schemas/productSchema';
import type { Product } from '../types/product';

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProductForm = ({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) => {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
        }
      : {
          name: '',
          description: '',
          price: 0,
          category: '',
          stock: 0,
        },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (product) {
        await updateProduct.mutate(
          { id: product.id, product: data },
          onSuccess
        );
      } else {
        await createProduct.mutate(data, onSuccess);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>

      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className={errors.price ? 'error' : ''}
          />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock *</label>
          <input
            id="stock"
            type="number"
            {...register('stock', { valueAsNumber: true })}
            className={errors.stock ? 'error' : ''}
          />
          {errors.stock && (
            <span className="error-message">{errors.stock.message}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          {...register('category')}
          className={errors.category ? 'error' : ''}
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && (
          <span className="error-message">{errors.category.message}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting
            ? 'Saving...'
            : product
              ? 'Update Product'
              : 'Create Product'}
        </button>
      </div>
    </form>
  );
};
