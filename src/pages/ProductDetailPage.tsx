import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../services/api"
import { useCartStore } from "../store/cartStore"
import type { Product } from "../types/product"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()
  const addToCart = useCartStore((s) => s.addToCart)

  useEffect(() => {
    if (id) {
      getProduct(id).then((res) =>
        setProduct(res.data)
      )
    }
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <img src={product.image} width={200} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  )
}