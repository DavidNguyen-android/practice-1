export const PRODUCT_CATEGORIES = [
  { label: "Electronics", value: "Electronics" },
  { label: "Accessories", value: "Accessories" },
  { label: "Furniture", value: "Furniture" },
  { label: "Clothing", value: "Clothing" },
  { label: "Books", value: "Books" },
  { label: "Other", value: "Other" },
] as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[number]["value"];