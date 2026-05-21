export type Product = {
  id: string;
  title: string;
  category: 'Jackets' | 'Shirts' | 'Pants' | 'Shoes' | 'Dresses' | 'Hoodies';
  price: number;
  color: string;
  accent: string;
  garmentModelUrl: string;
  thumbnailModelUrl: string;
};

export const categories = ['All', 'Jackets', 'Shirts', 'Pants', 'Shoes', 'Dresses', 'Hoodies'];

export const products: Product[] = [
  { id: 'brown-jacket', title: 'Brown Jacket', category: 'Jackets', price: 120, color: '#7B4F34', accent: '#C79A72', garmentModelUrl: 'https://cdn.raritone.dev/garments/brown-jacket.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/brown-jacket-thumb.glb' },
  { id: 'black-jacket', title: 'Black Jacket', category: 'Jackets', price: 140, color: '#242424', accent: '#757575', garmentModelUrl: 'https://cdn.raritone.dev/garments/black-jacket.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/black-jacket-thumb.glb' },
  { id: 'cream-shirt', title: 'Cream Shirt', category: 'Shirts', price: 85, color: '#D7CFC2', accent: '#F2E8D8', garmentModelUrl: 'https://cdn.raritone.dev/garments/cream-shirt.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/cream-shirt-thumb.glb' },
  { id: 'wide-trouser', title: 'Wide Trouser', category: 'Pants', price: 95, color: '#303030', accent: '#8E8E8E', garmentModelUrl: 'https://cdn.raritone.dev/garments/wide-trouser.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/wide-trouser-thumb.glb' },
  { id: 'runner-sneaker', title: 'Runner Sneaker', category: 'Shoes', price: 110, color: '#E8E8E8', accent: '#9B9B9B', garmentModelUrl: 'https://cdn.raritone.dev/garments/runner-sneaker.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/runner-sneaker-thumb.glb' },
  { id: 'linen-overshirt', title: 'Linen Overshirt', category: 'Shirts', price: 100, color: '#948470', accent: '#D5C8B7', garmentModelUrl: 'https://cdn.raritone.dev/garments/linen-overshirt.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/linen-overshirt-thumb.glb' },
  { id: 'black-hoodie', title: 'Black Hoodie', category: 'Hoodies', price: 118, color: '#151515', accent: '#4C4C4C', garmentModelUrl: 'https://cdn.raritone.dev/garments/black-hoodie.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/black-hoodie-thumb.glb' },
  { id: 'silver-dress', title: 'Silver Dress', category: 'Dresses', price: 180, color: '#BFC3C7', accent: '#F4F5F5', garmentModelUrl: 'https://cdn.raritone.dev/garments/silver-dress.glb', thumbnailModelUrl: 'https://cdn.raritone.dev/garments/silver-dress-thumb.glb' },
];
