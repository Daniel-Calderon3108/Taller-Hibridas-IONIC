import { Injectable } from '@angular/core';
import { ProductService } from './product';
import { StorageService } from './storage';
import { Cart, Product } from 'src/app/model';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private STORAGE_KEY = 'cart';
    private cart: Cart[] = [];
    
    constructor(private storage: StorageService, private productService: ProductService) {
        this.loadCart();
    }

    private async loadCart() {
        const storedCart = await this.storage.get(this.STORAGE_KEY);
        this.cart = storedCart || [];
    }

    private async saveCart() {
        await this.storage.set(this.STORAGE_KEY, this.cart);
    }

    async getItems(): Promise<Cart[]> {
        await this.loadCart();
        return [...this.cart];
    }

    async addToCart(product: Product, quantity: number = 1): Promise<boolean> {
        await this.loadCart();
        const productExists = this.cart.find(item => item.product.id === product.id);

        if (productExists) {
            productExists.quantity += quantity;
        } else {
            this.cart.push({product, quantity});
        }
        await this.saveCart();
        return true;
    }

    async updateQuantity(productId: number, quantity: number): Promise<boolean> {
        await this.loadCart();
        const cartItem = this.cart.find(item => item.product.id === productId);

        if (cartItem) {
            if (quantity <= 0) return await this.removeFromCart(productId);

            cartItem.quantity = quantity;
        }
        await this.saveCart();
        return true;
    }

    async removeFromCart(productId: number): Promise<boolean> {
        await this.loadCart();
        const cartItem = this.cart.find(item => item.product.id === productId);

        if (cartItem) {
            this.cart.splice(this.cart.indexOf(cartItem), 1);
            await this.saveCart();
            return true;
        }
        return false;
    }

    async clearCart(): Promise<void> {
        this.cart = [];
        await this.saveCart();
    }

    async getTotalProducts(): Promise<number> {
        await this.loadCart();
        return this.cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
    }

    async calculateTotal(): Promise<number> {
        await this.loadCart();
        return this.cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
    }

    async getTotalProductSpecific(productId: number): Promise<number> {
        await this.loadCart();
        const cartItem = this.cart.find(item => item.product.id === productId);
        return cartItem ? cartItem.quantity : 0;
    }
}