import type { OrderStatus, UserType } from "./enums";

export interface Product {
    id?: number;
    name: string;
    description?: string;
    cost: number;
    imageSource?: string;
    stock: number;
}

export interface BasketItem {
    id?: number;
    product: Product;
    count: number;
}

export interface Basket {
    id?: number;
    items: BasketItem[];
}

export interface User {
    id?: number;
    email?: string;
    password?: string;
    userType: UserType;
    firstName?: string;
    lastName?: string;
    address?: string;
    country?: string;
    phone?: string;
    basket?: Basket;
    orders?: Order[];
}

export interface OrderItem {
    id?: number;
    product: Product;
    count: number;
    costAtPurchase: number;
}

export interface Order {
    id?: number;
    items: OrderItem[];
    totalCost: number;
    orderDate: Date;
    orderStatus: OrderStatus;
    orderAddress: string;
    user: User;
}

export interface UserLoginResponse {
    user: User;
    errorMessage?: string;
    success?: boolean;
}