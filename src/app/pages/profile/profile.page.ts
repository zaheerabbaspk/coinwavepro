import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // Try to load profile from localStorage first (saved by AuthService on login/signup)
    const storedProfile = this.authService.getStoredUserProfile();
    if (storedProfile) {
      this.applyProfile(storedProfile.name, storedProfile.email);
      return;
    }

    // Fallback: read current Firebase user if available
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const displayName = currentUser.displayName || currentUser.email || this.user.name;
      const email = currentUser.email || this.user.email;
      this.applyProfile(displayName, email);
    }
  }

  private applyProfile(name: string, email: string) {
    this.user.name = name;
    this.user.email = email;
    this.user.initials = name
      .split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0].toUpperCase())
      .slice(0, 2)
      .join('') || this.user.initials;
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
    this.authService.logout().finally(() => {
      this.router.navigate(['/signup']);
    });
  }
}
