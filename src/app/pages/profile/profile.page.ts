import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  user = {
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD',
    memberSince: 'Dec 2024',
    isPro: true
  };

  referralLink = 'https://taskreward.app/ref/JOHN2024';
  copied = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  copyLink() {
    navigator.clipboard.writeText(this.referralLink).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  onSignOut() {
    console.log('User signed out');
    this.router.navigate(['/signup']);
  }
}
