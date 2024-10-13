export type Cart = {
  userId: string;
  items: Item[];
};

export type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageString: string;
};
