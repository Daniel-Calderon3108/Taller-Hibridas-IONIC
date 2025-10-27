import { Injectable } from "@angular/core";
import { Product } from "src/app/model";
import { StorageService } from "./storage";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private STORAGE_KEY = 'products';
    private products: Product[] = [];

    constructor(private storage: StorageService) {
        this.loadInitialData();
    }

    private async loadInitialData() {
        try {
            const storedProducts = await this.storage.get(this.STORAGE_KEY);

            if (storedProducts && storedProducts.length > 0) {
                this.products = storedProducts;
                console.log('Productos cargadas desde el almacenamiento local.', this.products.length);
                return;
            }
            console.log('No se encontraron productos en el almacenamiento local. Cargando datos iniciales.');
            this.products = this.getDefaultProducts();
            await this.saveProducts();
            console.log('Productos iniciales guardados en el almacenamiento local.', this.products.length);
        } catch (error) {
            console.error('Error loading initial product data:', error);
            this.products = this.getDefaultProducts();
        }
    }

    private getDefaultProducts(): Product[] {
        return [
            {
                id: 1,
                name: "Samsung Galaxy A32",
                description: "Un smartphone con pantalla AMOLED de 6.4 pulgadas, cámara cuádruple de 64MP y batería de 5000mAh.",
                price: 799.99,
                imageUrl: "assets/images/smartphone_xyz.jpg",
                category: "Electronics",
                stock: 50,
                relevance: true            
            },
            {
                id: 2,
                name: "Auriculares Inalámbricos ABC",
                description: "Auriculares inalámbricos con cancelación de ruido y calidad de sonido superior.",
                price: 199.99,
                imageUrl: "assets/images/headphones_abc.jpg",
                category: "Electronics",
                stock: 100,
                relevance: true
            }
        ]
    }

    private async saveProducts() {
        await this.storage.set(this.STORAGE_KEY, this.products);
    }

    async getProducts(): Promise<Product[]> {
        await this.loadInitialData();
        return [...this.products];
    }

    async getProductById(id: number): Promise<Product | undefined> {
        await this.loadInitialData();
        return this.products.find(product => product.id === id);
    }

    async getCategories(): Promise<string[]> {
        await this.loadInitialData();
        const categories = this.products.map(product => product.category);
        return [...new Set(categories)];
    }
}