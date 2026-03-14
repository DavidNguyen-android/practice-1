import { Link } from "react-router-dom"
import { useCartStore } from "../store/cartStore"

export default function Header() {
    const itemCount = useCartStore((state) => state.items.length)

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-semibold">Product Management</Link>
                <div>
                    <Link to="/cart" className="relative">
                        <span className="material-icons">shopping_cart</span>
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    )
}