import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

type SegmentType = 'all' | 'earnings' | 'expenses';

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  time: string;
  type: 'earning' | 'expense';
  category: 'reward' | 'task' | 'purchase' | 'withdrawal' | 'referral' | 'pending';
}

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {
  currentSegment: SegmentType = 'all';

  totalEarned = 527.50;
  totalSpent = 400.00;

  allTransactions: Transaction[] = [
    {
      id: '1',
      title: 'Weekly Reward',
      subtitle: 'Starter Pack payout',
      amount: 7.00,
      date: 'Today',
      time: '2:30 PM',
      type: 'earning',
      category: 'reward'
    },
    {
      id: '2',
      title: 'Task Completed',
      subtitle: 'Daily check-in bonus',
      amount: 0.10,
      date: 'Today',
      time: '9:00 AM',
      type: 'earning',
      category: 'task'
    },
    {
      id: '3',
      title: 'Package Purchase',
      subtitle: 'Growth Pack investment',
      amount: 15.00,
      date: 'Dec 15, 2024',
      time: '',
      type: 'expense',
      category: 'purchase'
    },
    {
      id: '4',
      title: 'Pending Payment',
      subtitle: 'Pro Pack - awaiting approval',
      amount: 50.00,
      date: 'Dec 14, 2024',
      time: '',
      type: 'expense',
      category: 'pending' // Technically expense or special styling
    },
    {
      id: '5',
      title: 'Weekly Reward',
      subtitle: 'Growth Pack payout',
      amount: 22.00,
      date: 'Dec 13, 2024',
      time: '',
      type: 'earning',
      category: 'reward'
    },
    {
      id: '6',
      title: 'Withdrawal',
      subtitle: 'To Binance wallet',
      amount: 50.00,
      date: 'Dec 10, 2024',
      time: '',
      type: 'expense',
      category: 'withdrawal'
    },
    {
      id: '7',
      title: 'Referral Bonus',
      subtitle: 'New user signup',
      amount: 2.00,
      date: 'Dec 9, 2024',
      time: '',
      type: 'earning',
      category: 'referral'
    }
  ];

  filteredTransactions: Transaction[] = [];

  constructor() { }

  ngOnInit() {
    this.filterTransactions();
  }

  setSegment(segment: SegmentType) {
    this.currentSegment = segment;
    this.filterTransactions();
  }

  filterTransactions() {
    if (this.currentSegment === 'all') {
      this.filteredTransactions = this.allTransactions;
    } else if (this.currentSegment === 'earnings') {
      this.filteredTransactions = this.allTransactions.filter(t => t.type === 'earning');
    } else if (this.currentSegment === 'expenses') {
      this.filteredTransactions = this.allTransactions.filter(t => t.type === 'expense');
    }
  }

  // Helper for amounts
  formatAmount(amount: number, type: 'earning' | 'expense'): string {
    const prefix = type === 'earning' ? '+' : '-';
    return `${prefix}$${amount.toFixed(2)}`;
  }
}
