import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "./storage";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private storage: StorageService) { }

    async isAuthenticated(): Promise<boolean> {
        const user = await this.storage.get('user');
        return user !== null;
    }
}