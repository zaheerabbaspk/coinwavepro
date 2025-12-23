import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormInputComponent]
})
export class WalletPage implements OnInit {

  availableBalance: number = 2450.50;

  withdrawData = {
    address: '',
    amount: '',
    description: ''
  };

  pendingRequests = [
    {
      id: 'REQ-001',
      date: '2025-12-23',
      time: '14:30',
      amount: 150.00,
      description: 'Weekly earnings withdrawal',
      status: 'pending'
    },
    {
      id: 'REQ-002',
      date: '2025-12-22',
      time: '09:15',
      amount: 50.00,
      description: 'Bonus withdrawal',
      status: 'pending'
    }
  ];

  transactionHistory = [
    {
      id: 'TX-987',
      date: '2025-12-20',
      time: '11:20',
      amount: 500.00,
      description: 'Monthly payout',
      status: 'paid'
    },
    {
      id: 'TX-986',
      date: '2025-12-18',
      time: '16:45',
      amount: 1200.00,
      description: 'Large withdrawal request',
      status: 'rejected'
    },
    {
      id: 'TX-985',
      date: '2025-12-15',
      time: '10:00',
      amount: 300.00,
      description: 'Weekly earnings',
      status: 'paid'
    }
  ];

  activeTab: 'pending' | 'history' = 'pending';

  constructor() { }

  ngOnInit() {
  }

  setTab(tab: 'pending' | 'history') {
    this.activeTab = tab;
  }

  onRequestWithdraw() {
    if (!this.withdrawData.address || !this.withdrawData.amount) {
      console.log('Validation Error');
      return;
    }

    const amount = parseFloat(this.withdrawData.amount);
    if (amount > this.availableBalance) {
      console.log('Insufficient funds');
      return;
    }

    console.log('Withdrawal Requested:', this.withdrawData);

    // Mock adding to pending
    this.pendingRequests.unshift({
      id: `REQ-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      amount: amount,
      description: this.withdrawData.description,
      status: 'pending'
    });

    // Reset Form
    this.withdrawData = {
      address: '',
      amount: '',
      description: ''
    };
  }

}
