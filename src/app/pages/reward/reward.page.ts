import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

interface UpcomingReward {
  id: string;
  name: string;
  date: string;
  amount: number;
  daysRemaining: number;
  progress: number; // 0-100
}

interface EarningHistory {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'package' | 'task' | 'referral' | 'bonus';
  icon?: string;
}

@Component({
  selector: 'app-reward',
  templateUrl: './reward.page.html',
  styleUrls: ['./reward.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class RewardPage implements OnInit {

  availableBalance = 127.50;
  totalEarned = 527.50;

  upcomingRewards: UpcomingReward[] = [
    {
      id: '1',
      name: 'Starter Pack',
      date: 'Dec 20, 2024',
      amount: 7.00,
      daysRemaining: 3,
      progress: 57 // ~4/7 days
    },
    {
      id: '2',
      name: 'Growth Pack',
      date: 'Dec 22, 2024',
      amount: 22.00,
      daysRemaining: 5,
      progress: 28 // ~2/7 days
    }
  ];

  earningsHistory: EarningHistory[] = [
    {
      id: '1',
      title: 'Starter Pack',
      date: 'Dec 13, 2024',
      amount: 7.00,
      type: 'package'
    },
    {
      id: '2',
      title: 'Growth Pack',
      date: 'Dec 8, 2024',
      amount: 22.00,
      type: 'package'
    },
    {
      id: '3',
      title: 'Starter Pack',
      date: 'Dec 6, 2024',
      amount: 7.00,
      type: 'package'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onWithdraw() {
    console.log('Withdraw clicked');
    // Implement withdraw logic
  }
}
