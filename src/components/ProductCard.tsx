import { useCartStore } from "../store/cartStore"
import type { Product } from "../types/product"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
    const addToCart = useCartStore((state) => state.addToCart)

    return (
        <div className="border rounded p-4 flex flex-col items-center">
            <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add to Cart
            </button>
        </div>
    )
}