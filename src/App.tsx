import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage"

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}