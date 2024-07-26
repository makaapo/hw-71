export interface Dish {
  id: string;
  title: string;
  image: string;
  price: number;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface DishMutation {
  title: string;
  image: string;
  price: string;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface ApiOrder {
  dishes: {[id: string]: number};
  delivery: number;
}

export interface ApiOrders {
  [id: string]: ApiOrder;
}

export interface Order {
  id: string;
  dishes: {dish: Dish; amount: number}[];
  delivery: number;
  totalPrice: number;
}

export interface OrderInfo {
  [id: string]: number;
}

export interface OrdersInfo {
  dishes: OrderInfo;
}