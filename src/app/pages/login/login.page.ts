import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule]
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

      let userData = JSON.parse(localStorage.getItem("user") || '{}');

      let storedUser = userData.username;
      let storedPassword = userData.password;

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
