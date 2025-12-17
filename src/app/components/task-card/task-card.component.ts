import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress?: number; // 0-100
  status: 'pending' | 'in-progress' | 'completed';
  icon: 'share' | 'game' | 'checkin' | 'default';
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() startTask = new EventEmitter<Task>();
  @Output() continueTask = new EventEmitter<Task>();

  get iconBgClass(): string {
    switch (this.task?.status) {
      case 'completed':
        return 'bg-emerald-500/20';
      case 'in-progress':
        return 'bg-gray-700';
      default:
        return 'bg-emerald-500/20';
    }
  }

  get buttonConfig(): { text: string; classes: string; icon: string } | null {
    switch (this.task?.status) {
      case 'pending':
        return {
          text: 'Start Task',
          classes: 'bg-emerald-500 text-white hover:bg-emerald-600',
          icon: 'play'
        };
      case 'in-progress':
        return {
          text: 'Continue',
          classes: 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900',
          icon: 'clock'
        };
      default:
        return null;
    }
  }

  onAction(): void {
    if (this.task.status === 'pending') {
      this.startTask.emit(this.task);
    } else if (this.task.status === 'in-progress') {
      this.continueTask.emit(this.task);
    }
  }
}
