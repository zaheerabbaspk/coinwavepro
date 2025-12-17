import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatCardVariant = 'green' | 'amber' | 'dark';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() subtitle?: string;
  @Input() icon: 'wallet' | 'trending' | 'tasks' | 'gift' = 'wallet';
  @Input() variant: StatCardVariant = 'dark';

  get cardClasses(): string {
    const baseClasses = 'rounded-2xl p-4 flex items-start gap-3';
    switch (this.variant) {
      case 'green':
        return `${baseClasses} bg-gradient-to-br from-emerald-600 to-emerald-800`;
      case 'amber':
        return `${baseClasses} bg-gradient-to-br from-amber-400 to-amber-500`;
      default:
        return `${baseClasses} bg-gray-800 border border-gray-700`;
    }
  }

  get iconBgClasses(): string {
    switch (this.variant) {
      case 'green':
        return 'bg-emerald-500/30';
      case 'amber':
        return 'bg-amber-600/30';
      default:
        return 'bg-gray-700';
    }
  }

  get textColorClasses(): string {
    switch (this.variant) {
      case 'amber':
        return 'text-gray-900';
      default:
        return 'text-white';
    }
  }

  get subtitleColorClasses(): string {
    switch (this.variant) {
      case 'amber':
        return 'text-gray-700';
      default:
        return 'text-gray-400';
    }
  }
}
