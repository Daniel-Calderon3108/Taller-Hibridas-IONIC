import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, MenuController  } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class HeaderComponent  implements OnInit {

  @Input() appName: string = "Optica DCA";
  @Input() location: string = '';
  @Input() showProfile: boolean = true;

  userActual : any = null;

  constructor(private router: Router, private menu: MenuController) { }

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

  // Navegar a otra pagina
  navigate(page: string) {
    this.router.navigate([page]);
    this.menu.close();
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

  // Abrir menu
  openMenu() {
    this.menu.open();
  }
}
