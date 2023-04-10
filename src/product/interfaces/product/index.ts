export interface IProduct {
  title: string;
  image: string;
  description: string;
  slug: string;
  price: number;
  count: number;
  offered?: Boolean;
}
