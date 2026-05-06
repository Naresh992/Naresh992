export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: 'brown-jacket',
    title: 'Brown Jacket',
    category: 'Outerwear Men’s',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'black-jacket',
    title: 'Black Jacket',
    category: 'Outerwear Men’s',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'cream-shirt',
    title: 'Cream Shirt',
    category: 'Essentials',
    price: 85,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'black-trouser',
    title: 'Wide Trouser',
    category: 'Tailored Fit',
    price: 95,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
];
