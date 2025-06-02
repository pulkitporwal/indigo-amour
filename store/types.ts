export interface Billboard {
  id: string;
  label: string;
  images: [];
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  collectionTitle: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  cuttedPrice: string;
  description: string;
  shippingAvailable: string;
  discount: number;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
