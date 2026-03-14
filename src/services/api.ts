import axios from "axios"

export const api = axios.create({
  baseURL: "https://fakestoreapi.com"
})

export const getProducts = () => api.get("/products")

export const getProduct = (id: string) =>
  api.get(`/products/${id}`)