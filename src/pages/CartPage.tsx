import { useCartStore } from "../store/cartStore"

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.removeFromCart)

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <div>
      <h1>Cart</h1>

      {items.map((item) => (
        <div key={item.id}>
          {item.title} x {item.quantity}
          <button onClick={() => remove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${total}</h2>
    </div>
  )
}