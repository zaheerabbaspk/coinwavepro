import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.scss'],
})
export class StepIndicatorComponent {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 3;

  get steps(): number[] {
    return Array.from({ length: this.totalSteps }, (_, i) => i + 1);
  }

  getStepClass(step: number): string {
    if (step < this.currentStep) {
      // Completed step
      return 'bg-emerald-500 text-white';
    } else if (step === this.currentStep) {
      // Current step
      return 'bg-emerald-500 text-white';
    } else {
      // Future step
      return 'bg-gray-700 text-gray-400';
    }
  }

  getLineClass(step: number): string {
    if (step < this.currentStep) {
      return 'bg-emerald-500';
    } else {
      return 'bg-gray-700';
    }
  }
}
