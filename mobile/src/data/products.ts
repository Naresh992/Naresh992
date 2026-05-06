export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  color: string;
  accent: string;
};

export const categories = ['All', 'Jackets', 'Shirts', 'Pants', 'Shoes', 'Saved'];

export const products: Product[] = [
  { id: 'brown-jacket', title: 'Brown Jacket', category: 'Jackets', price: 120, color: '#7B4F34', accent: '#C79A72' },
  { id: 'black-jacket', title: 'Black Jacket', category: 'Jackets', price: 140, color: '#242424', accent: '#757575' },
  { id: 'cream-shirt', title: 'Cream Shirt', category: 'Shirts', price: 85, color: '#D7CFC2', accent: '#F2E8D8' },
  { id: 'wide-trouser', title: 'Wide Trouser', category: 'Pants', price: 95, color: '#303030', accent: '#8E8E8E' },
  { id: 'runner-sneaker', title: 'Runner Sneaker', category: 'Shoes', price: 110, color: '#E8E8E8', accent: '#9B9B9B' },
  { id: 'linen-overshirt', title: 'Linen Overshirt', category: 'Shirts', price: 100, color: '#948470', accent: '#D5C8B7' },
];
