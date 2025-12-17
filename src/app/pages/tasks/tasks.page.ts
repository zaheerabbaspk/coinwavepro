import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { TaskCardComponent, Task } from '../../components/task-card/task-card.component';

type SegmentType = 'all' | 'available' | 'completed';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, TaskCardComponent]
})
export class TasksPage implements OnInit {
  currentSegment: SegmentType = 'all';

  // Progress Data
  todayProgress = {
    current: 1,
    total: 6,
    bonus: 1.00
  };

  weeklyChallenge = {
    current: 14,
    total: 50,
    bonus: 5.00
  };

  // Mock Tasks
  allTasks: Task[] = [
    {
      id: '1',
      title: 'Daily Check-in',
      description: 'Check in every day for bonus rewards',
      reward: 0.10,
      status: 'completed',
      icon: 'checkin'
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
      title: 'Share Referral Link',
      description: 'Share your unique link with 3 friends',
      reward: 0.50,
      status: 'pending',
      icon: 'share'
    },
    {
      id: '4',
      title: 'Watch Video Ad',
      description: 'Watch a short promotional video',
      reward: 0.05,
      status: 'pending',
      icon: 'default'
    },
    {
      id: '5',
      title: 'Join Telegram Group',
      description: 'Join our community for updates',
      reward: 0.15,
      status: 'pending',
      icon: 'default'
    },
    {
      id: '6',
      title: 'Rate Our App',
      description: 'Leave a 5-star review on the app store',
      reward: 0.20,
      status: 'pending',
      icon: 'default'
    }
  ];

  filteredTasks: Task[] = [];

  constructor() { }

  ngOnInit() {
    this.filterTasks();
  }

  setSegment(segment: SegmentType) {
    this.currentSegment = segment;
    this.filterTasks();
  }

  filterTasks() {
    if (this.currentSegment === 'all') {
      this.filteredTasks = this.allTasks;
    } else if (this.currentSegment === 'available') {
      this.filteredTasks = this.allTasks.filter(t => t.status !== 'completed');
    } else if (this.currentSegment === 'completed') {
      this.filteredTasks = this.allTasks.filter(t => t.status === 'completed');
    }
  }

  onStartTask(task: Task) {
    console.log('Starting task:', task);
    // Logic to start task
  }

  onContinueTask(task: Task) {
    console.log('Continuing task:', task);
    // Logic to continue task
  }
}
