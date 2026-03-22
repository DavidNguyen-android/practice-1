import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PRODUCT_CATEGORIES } from '../../constants/categories';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';
import { productSchema, type ProductFormData } from '../../schemas/productSchema';
import type { Product } from '../../types/product';
import { FormInput } from '../form/FormInput';
import { FormSelect } from '../form/FormSelect';
import { FormTextarea } from '../form/FormTextarea';
import { Button } from '../ui/Button';

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

            <FormInput
                id="name"
                label="Product Name *"
                register={register("name")}
                error={errors.name}
            />

            <FormTextarea
                id="description"
                label="Description *"
                register={register("description")}
                error={errors.description}
            />

            <div className="form-row">
                <FormInput
                    id="price"
                    label="Price *"
                    type="number"
                    step="0.01"
                    register={register("price", { valueAsNumber: true })}
                    error={errors.price}
                />
                <FormInput
                    id="stock"
                    label="Stock *"
                    type="number"
                    step="1"
                    register={register("stock", { valueAsNumber: true })}
                    error={errors.stock}
                />
            </div>


            <FormSelect
                id="category"
                label="Category *"
                options={PRODUCT_CATEGORIES}
                register={register("category")}
                error={errors.category}
                placeholder="Select a category"
            />

            <div className="form-actions">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} variant="primary">
                    {isSubmitting
                        ? 'Saving...'
                        : product
                            ? 'Update Product'
                            : 'Create Product'}
                </Button>
            </div>
        </form>
    );
};
