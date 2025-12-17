import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() type: InputType = 'text';
  @Input() icon?: 'email' | 'lock' | 'user' | 'phone' | 'search' | 'hash' | 'custom';
  @Input() customIconSvg?: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() error?: string;
  @Input() hint?: string;

  @Output() inputChange = new EventEmitter<string>();
  @Output() inputBlur = new EventEmitter<void>();
  @Output() inputFocus = new EventEmitter<void>();

  value: string = '';
  showPassword: boolean = false;
  isFocused: boolean = false;

  // ControlValueAccessor implementation
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.inputChange.emit(this.value);
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.inputBlur.emit();
  }

  onFocus(): void {
    this.isFocused = true;
    this.inputFocus.emit();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  get containerClasses(): string {
    let classes = 'bg-gray-800 border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors';
    if (this.error) {
      classes += ' border-red-500';
    } else if (this.isFocused) {
      classes += ' border-emerald-500';
    } else {
      classes += ' border-gray-700 hover:border-gray-600';
    }
    if (this.disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    }
    return classes;
  }
}
