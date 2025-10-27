import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class ProfilePage implements OnInit {

  userActual : any = null;
  
  constructor() { }

  ngOnInit() {
    this.getUserActual();
  }

  getUserActual() {
    try {
      this.userActual = localStorage.getItem("user");

      if (!this.userActual) {
        console.log("Usuario no se ha logueado");
        return;
      }
      this.userActual = JSON.parse(this.userActual);
    } catch (error) {
      this.userActual = null;
    }
  }

  // Obtener y mostrar el nombre del usuario
  getUserName() : string {
    return this.userActual ? this.userActual.name + " " + this.userActual.lastname : "Usuario No Verificado";
  }

  // Obtener iniciales del usuario
  getUserInitials() : string {
    if(!this.userActual) return "UNV";
    return (this.userActual.name.charAt(0) + this.userActual.lastname.charAt(0)).toUpperCase();
  }

}
