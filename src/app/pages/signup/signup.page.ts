import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private readonly authService: AuthService,
    private readonly alertController: AlertController,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  setView(view: AuthView) {
    this.view = view;
  }

  async onLogin() {
    const { email, password } = this.loginData;

    if (!email || !password) {
      const alert = await this.alertController.create({
        header: 'Missing Information',
        message: 'Please enter your email and password.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    try {
      console.log('[SignupPage] Logging in with email/password:', { email });

      const user = await this.authService.loginWithEmail(email, password);

      console.log('[SignupPage] Email login success:', user);

      const alert = await this.alertController.create({
        header: 'Login Successful',
        message: `Logged in as ${user.name || user.email}.`,
        buttons: ['OK'],
      });

      await alert.present();

      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('[SignupPage] Email login error:', error);

      const firebaseMessage = (error as any)?.message || 'Unable to sign in. Please try again.';

      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: firebaseMessage,
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  async onSignup() {
    const { fullName, email, password, confirmPassword } = this.signupData;

    if (!fullName || !email || !password || !confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Missing Information',
        message: 'Please fill in all fields to create an account.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    if (password !== confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Password Mismatch',
        message: 'Password and Confirm Password do not match.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    try {
      console.log('[SignupPage] Creating account with email/password:', { fullName, email });

      const user = await this.authService.signupWithEmail(fullName, email, password);

      console.log('[SignupPage] Email signup success:', user);

      const alert = await this.alertController.create({
        header: 'Account Created',
        message: `Account created for ${user.name} (${user.email}).`,
        buttons: ['OK'],
      });

      await alert.present();
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('[SignupPage] Email signup error:', error);

      const firebaseMessage = (error as any)?.message || 'Unable to create account. Please try again.';

      const alert = await this.alertController.create({
        header: 'Signup Failed',
        message: firebaseMessage,
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  async onGoogleLogin() {
    try {
      const user = await this.authService.loginWithGoogle();

      console.log('[SignupPage] Google login success:', user);

      const alert = await this.alertController.create({
        header: 'Login Successful',
        message: `Logged in as ${user.name} (${user.email})`,
        buttons: ['OK'],
      });

      await alert.present();

      await this.router.navigate(['/dashboard']);
    } catch (error) {
      const message = (error as any)?.message || '';

      // If user just closes the Google popup, don't log or show an error alert
      if (message === 'Popup closed') {
        return;
      }

      console.error('[SignupPage] Google login error:', error);

      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Unable to complete Google login. Please try again.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
