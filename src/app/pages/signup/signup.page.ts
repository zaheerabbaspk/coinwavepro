import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';

type AuthView = 'landing' | 'login' | 'signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, FormInputComponent]
})
export class SignupPage implements OnInit {
  view: AuthView = 'landing';

  // Login Form Data
  loginData = {
    email: '',
    password: ''
  };

  // Signup Form Data
  signupData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor() { }

  ngOnInit() {
  }

  setView(view: AuthView) {
    this.view = view;
  }

  onLogin() {
    console.log('Login with:', this.loginData);
  }

  onSignup() {
    console.log('Signup with:', this.signupData);
  }

  onGoogleLogin() {
    console.log('Google Login clicked');
  }
}
