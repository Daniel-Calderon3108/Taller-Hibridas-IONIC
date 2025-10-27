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

    private async getItems(): Promise<Cart[]> {
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
}