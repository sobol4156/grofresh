export interface IProduct {
  id: number;
  src: string;
  name: string;
  unitValue: number;
  unit: Unit;
  price: number;
  category: string;
  category_id: number;
  quantity: number;
}

export type Unit = "g" | "kg" | "ml" | "l" | "pcs" | "dozen" | "loaf";
