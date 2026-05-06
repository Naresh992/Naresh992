export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  fit: string;
  color: string;
  accent: string;
};

export const products: Product[] = [
  {
    id: 'brown-jacket',
    title: 'Brown Jacket',
    category: 'Outerwear Men’s',
    price: 120,
    fit: 'Relaxed fit',
    color: '#7A5136',
    accent: '#B58B67',
  },
  {
    id: 'black-jacket',
    title: 'Black Jacket',
    category: 'Outerwear Men’s',
    price: 120,
    fit: 'Structured fit',
    color: '#202020',
    accent: '#6E6E6E',
  },
  {
    id: 'cream-shirt',
    title: 'Cream Shirt',
    category: 'Essentials',
    price: 85,
    fit: 'True to size',
    color: '#D8D0C4',
    accent: '#EFE7DA',
  },
  {
    id: 'wide-trouser',
    title: 'Wide Trouser',
    category: 'Tailored Fit',
    price: 95,
    fit: 'Wide leg',
    color: '#2B2A29',
    accent: '#9B9185',
  },
];
