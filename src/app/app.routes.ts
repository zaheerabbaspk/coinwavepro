import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'packages',
    loadComponent: () => import('./pages/packages/packages.page').then(m => m.PackagesPage)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks.page').then(m => m.TasksPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.page').then(m => m.HistoryPage)
  },
  {
    path: 'reward',
    loadComponent: () => import('./pages/reward/reward.page').then(m => m.RewardPage)
  },
  {
    path: 'wallet',
    loadComponent: () => import('./pages/wallet/wallet.page').then(m => m.WalletPage)
  },
  {
    path: 'form-control',
    loadComponent: () => import('./components/form-control/form-control.page').then(m => m.FormControlPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.page').then(m => m.PaymentPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./pages/notifications/notifications.page').then( m => m.NotificationsPage)
  },
  // Catch-all: handle 404 by redirecting to signup
  {
    path: '**',
    redirectTo: 'signup',
    pathMatch: 'full',
  },

];
