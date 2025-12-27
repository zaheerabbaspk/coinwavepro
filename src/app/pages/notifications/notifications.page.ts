import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

export interface Notification {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Removed Ionic modules as per request/standard logic for this user
})
export class NotificationsPage implements OnInit {
  notifications: Notification[] = [
    {
      id: 1,
      title: 'System Maintenance Update',
      excerpt: 'Scheduled maintenance will occur on Dec 30th...',
      content: 'We will be performing scheduled maintenance on our servers on December 30th from 2:00 AM to 6:00 AM UTC. During this time, trading services may be temporarily unavailable. We apologize for any inconvenience.',
      date: new Date('2024-12-25T10:00:00'),
      read: false
    },
    {
      id: 2,
      title: 'New Bitcoin High!',
      excerpt: 'Bitcoin has reached a new all-time high of...',
      content: 'Bitcoin has just surpassed its previous all-time high, reaching $95,000! Experts predict continued growth as institutional adoption increases. Check your portfolio to see how this impacts your holdings.',
      date: new Date('2024-12-24T14:30:00'),
      read: true
    },
    {
      id: 3,
      title: 'Welcome to CoinWave Pro',
      excerpt: 'Thank you for joining our platform...',
      content: 'Welcome to CoinWave Pro! We are excited to have you on board. Start by verifying your identity to unlock full trading limits. If you have any questions, our support team is available 24/7.',
      date: new Date('2024-12-20T09:15:00'),
      read: true
    }
  ];

  selectedNotification: Notification | null = null;
  filterType: 'all' | 'unread' | 'read' = 'all';

  constructor() { }

  ngOnInit() {
  }

  get filteredNotifications(): Notification[] {
    if (this.filterType === 'unread') {
      return this.notifications.filter(n => !n.read);
    } else if (this.filterType === 'read') {
      return this.notifications.filter(n => n.read);
    }
    return this.notifications;
  }

  setFilter(type: 'all' | 'unread' | 'read') {
    this.filterType = type;
  }

  selectNotification(notification: Notification) {
    this.selectedNotification = notification;
    if (!notification.read) {
      this.markAsRead(notification);
    }
  }

  clearSelection() {
    this.selectedNotification = null;
  }

  markAsRead(notification: Notification) {
    notification.read = true;
    // In a real app, call API to mark as read
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}
