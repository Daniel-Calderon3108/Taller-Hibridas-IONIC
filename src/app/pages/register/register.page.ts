import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required]),
  });

  constructor(private router : Router) { }

  ngOnInit() {
  }

  navigate(page : string) {
    this.router.navigate([page]);
  }

  register() {
    if(!this.form.valid) {
      alert("Por favor complete todos los campos");
      return;
    }

    if(this.form.value.password !== this.form.value.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

     // Encriptar contraseña
      let encryptedPassword = btoa(this.form.value.password ? this.form.value.password : "");

      localStorage.setItem("user", this.form.value.username ? this.form.value.username : "");
      localStorage.setItem("password", encryptedPassword);

      this.navigate('/login');
  }
}
