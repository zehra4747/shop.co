export interface Product {
  description: string | JSX.Element | Iterable<string | JSX.Element>;
  slug: any;
  quantity: string | JSX.Element | Iterable<string | JSX.Element>;
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: string | null;
  color: string | null;
}
