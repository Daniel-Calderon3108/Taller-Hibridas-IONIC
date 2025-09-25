import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class MainPage implements OnInit {

  userData : any = JSON.parse(localStorage.getItem("user") || '{}');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() { this.router.navigate(['/login']); }
}
