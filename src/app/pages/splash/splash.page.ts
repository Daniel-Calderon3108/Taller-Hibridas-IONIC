import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class SplashPage implements OnInit, OnDestroy {

  timer : any; // Variable to hold the timer reference

  constructor(private router : Router) { }

  ngOnInit() {
    this.timerToHome(2500, 'home');
  }

  ngOnDestroy() {
    clearTimeout(this.timer); // Clear the timer if the component is destroyed before navigation
  }

  timerToHome(time : number, url : string) {
    this.timer = setTimeout(() => {
      this.router.navigate([url]); // Navigate to the specified URL after the timeout
    }, time);
  }
}
