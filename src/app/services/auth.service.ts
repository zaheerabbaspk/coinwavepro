import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

export interface GoogleUserProfile {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = getAuth(initializeApp(environment.firebase));

  constructor() { }

  async loginWithGoogle(): Promise<GoogleUserProfile> {
    const clientId = environment.googleWebClientId;

    console.log('[AuthService] Initializing SocialLogin with clientId:', clientId);

    await SocialLogin.initialize({
      google: {
        webClientId: clientId,
      },
    });

    console.log('[AuthService] Calling SocialLogin.login for provider google');

    const result: any = await SocialLogin.login({
      provider: 'google',
      options: {},
    });

    console.log('[AuthService] SocialLogin.login result:', result);

    const profile: GoogleUserProfile = {
      name: result?.name ?? '',
      email: result?.email ?? '',
    };

    this.saveUserProfile(profile);

    return profile;
  }

  async loginWithEmail(email: string, password: string): Promise<GoogleUserProfile> {
    console.log('[AuthService] Logging in with email/password:', email);

    const credential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
    const user = credential.user;

    const profile: GoogleUserProfile = {
      name: user.displayName ?? '',
      email: user.email ?? email,
    };

    this.saveUserProfile(profile);

    return profile;
  }

  async signupWithEmail(fullName: string, email: string, password: string): Promise<GoogleUserProfile> {
    console.log('[AuthService] Signing up with email/password:', email);

    const credential = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);

    if (fullName) {
      try {
        await updateProfile(credential.user, { displayName: fullName });
      } catch (e) {
        console.warn('[AuthService] Failed to update displayName for user:', e);
      }
    }

    const user = credential.user;

    const profile: GoogleUserProfile = {
      name: user.displayName ?? fullName ?? '',
      email: user.email ?? email,
    };

    this.saveUserProfile(profile);

    return profile;
  }

  getCurrentUser(): User | null {
    return this.firebaseAuth.currentUser;
  }

  async logout(): Promise<void> {
    await signOut(this.firebaseAuth);
    try {
      localStorage.removeItem('userProfile');
    } catch {
      // ignore storage errors
    }
  }

  saveUserProfile(profile: GoogleUserProfile): void {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch {
      // ignore storage errors
    }
  }

  getStoredUserProfile(): GoogleUserProfile | null {
    try {
      const raw = localStorage.getItem('userProfile');
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as GoogleUserProfile;
    } catch {
      return null;
    }
  }
}
