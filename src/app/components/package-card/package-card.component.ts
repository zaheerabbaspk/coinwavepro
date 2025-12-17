import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Package {
  id: string;
  name: string;
  duration: string;
  price: number;
  returns: number;
  returnPercent: number;
  features: string[];
  isPopular?: boolean;
}

export type PackageStatus = 'available' | 'active' | 'pending';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'],
})
export class PackageCardComponent {
  @Input() package!: Package;
  @Input() status: PackageStatus = 'available';
  @Output() selectPackage = new EventEmitter<Package>();

  get cardBorderClass(): string {
    switch (this.status) {
      case 'active':
        return 'border-amber-500';
      case 'pending':
        return 'border-emerald-500';
      default:
        return this.package?.isPopular ? 'border-emerald-500' : 'border-gray-700';
    }
  }

  get buttonClasses(): string {
    switch (this.status) {
      case 'active':
        return 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 hover:from-amber-500 hover:to-amber-600';
      case 'pending':
        return 'bg-gray-700 text-gray-400 cursor-not-allowed';
      default:
        return this.package?.isPopular
          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
          : 'bg-gray-700 text-white hover:bg-gray-600';
    }
  }

  get buttonText(): string {
    switch (this.status) {
      case 'active':
        return 'View Progress';
      case 'pending':
        return 'Awaiting Approval';
      default:
        return 'Select Package';
    }
  }

  get statusBadge(): { text: string; classes: string } | null {
    switch (this.status) {
      case 'active':
        return { text: '✦ Active', classes: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' };
      case 'pending':
        return { text: '⏱ Pending', classes: 'bg-amber-500/20 text-amber-400 border border-amber-500/50' };
      default:
        return this.package?.isPopular
          ? { text: '✦ Popular', classes: 'bg-gray-700 text-white' }
          : null;
    }
  }

  onSelect(): void {
    if (this.status !== 'pending') {
      this.selectPackage.emit(this.package);
    }
  }
}
