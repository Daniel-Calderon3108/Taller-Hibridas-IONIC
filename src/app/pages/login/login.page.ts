import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    user: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(private router : Router) { }

  ngOnInit() {
  }

  navigate(page : string) {
    this.router.navigate([page]);
  }

  login() {
    if(this.form.valid) {
      let storedUser = localStorage.getItem("user");
      let storedPassword = localStorage.getItem("password");

      let encryptedPassword = btoa(this.form.value.password ? this.form.value.password : "");

      if(storedUser === this.form.value.user && storedPassword === encryptedPassword) {
        this.navigate('/main');
        return;
      }
      alert("Usuario o clave incorrecta");
      this.form.reset();
    }
  }
}
