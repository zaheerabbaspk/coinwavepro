import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import { TaskCardComponent, Task } from '../components/task-card/task-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CommonModule, StatCardComponent, TaskCardComponent],
})
export class HomePage {
  // Stats data
  stats = {
    balance: '$127.50',
    balanceChange: '+$12.50 this week',
    totalEarned: '$527.50',
    tasksDone: '24/30',
    nextReward: '3 days'
  };

  // Active package data
  activePackage = {
    name: 'Starter Pack',
    priceRange: '$5 → $7 weekly',
    progress: 71, // 5/7 days = ~71%
    daysProgress: '5/7 days',
    earnedSoFar: '$5.00'
  };

  // Today's tasks
  tasks: Task[] = [
    {
      id: '1',
      title: 'Share Referral Link',
      description: 'Share your unique link with friends',
      reward: 0.50,
      status: 'pending',
      icon: 'share'
    },
    {
      id: '2',
      title: 'Play Mini Game',
      description: 'Complete 3 rounds of the puzzle game',
      reward: 0.25,
      progress: 66,
      status: 'in-progress',
      icon: 'game'
    },
    {
      id: '3',
      title: 'Daily Check-in',
      description: 'Check in every day for bonus rewards',
      reward: 0.10,
      status: 'completed',
      icon: 'checkin'
    }
  ];

  constructor(private router: Router) { }

  navigateToPackages() {
    this.router.navigate(['/packages']);
  }

  navigateToRewards() {
    this.router.navigate(['/reward']);
  }

  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }

  onStartTask(task: Task) {
    console.log('Starting task:', task);
  }

  onContinueTask(task: Task) {
    console.log('Continuing task:', task);
  }
}
