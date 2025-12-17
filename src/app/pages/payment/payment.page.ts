import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { StepIndicatorComponent } from '../../components/step-indicator/step-indicator.component';
import { FormInputComponent } from '../../components/form-input/form-input.component';

interface SelectedPackage {
  id: string;
  name: string;
  price: number;
  returns: number;
  duration: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, StepIndicatorComponent, FormInputComponent]
})
export class PaymentPage implements OnInit {
  currentStep = 1;

  selectedPackage: SelectedPackage = {
    id: 'growth',
    name: 'Growth Pack',
    price: 15,
    returns: 22,
    duration: '7 days'
  };

  walletAddress = 'TNa1B2C3D4E5F6G7H8I9J0KLmnoPQRSTu';
  copied = false;

  // Step 2 data
  transactionId: string = '';
  selectedFile: File | null = null;
  selectedFileName: string = '';
  isDragging: boolean = false;

  // Step 3 data
  orderId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Get package details from query params
    this.route.queryParams.subscribe(params => {
      if (params['packageId']) {
        this.selectedPackage = {
          id: params['packageId'],
          name: params['packageName'] || 'Growth Pack',
          price: Number(params['packagePrice']) || 15,
          returns: Number(params['packageReturns']) || 22,
          duration: '7 days'
        };
      }
    });
  }

  // Step 1 Methods
  copyAddress() {
    navigator.clipboard.writeText(this.walletAddress).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  openBinance() {
    window.open('https://www.binance.com', '_blank');
  }

  confirmPayment() {
    this.currentStep = 2;
  }

  // Step 2 Methods
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    // Validate file type and size (5MB limit)
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PNG or JPG file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    this.selectedFile = file;
    this.selectedFileName = file.name;
  }

  removeFile() {
    this.selectedFile = null;
    this.selectedFileName = '';
  }

  goBackToStep1() {
    this.currentStep = 1;
  }

  submitProof() {
    if (!this.selectedFile) {
      alert('Please upload a payment proof');
      return;
    }
    // Generate order ID
    this.orderId = `#ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    this.currentStep = 3;
  }

  // Step 3 Methods
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    if (this.currentStep === 1) {
      this.router.navigate(['/packages']);
    } else if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }
}
