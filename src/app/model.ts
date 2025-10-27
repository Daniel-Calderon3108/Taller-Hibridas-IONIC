export interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    relevance: boolean;
}

export interface Cart {
    product: Product;
    quantity: number;
}