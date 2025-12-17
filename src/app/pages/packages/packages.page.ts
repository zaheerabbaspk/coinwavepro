import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { PackageCardComponent, Package, PackageStatus } from '../../components/package-card/package-card.component';

interface UserPackage {
  package: Package;
  status: PackageStatus;
}

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, PackageCardComponent]
})
export class PackagesPage implements OnInit {

  // Available packages
  availablePackages: Package[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      duration: '7 days',
      price: 5,
      returns: 7,
      returnPercent: 40,
      features: ['Daily task rewards', 'Basic support', 'Weekly payout']
    },
    {
      id: 'growth',
      name: 'Growth Pack',
      duration: '7 days',
      price: 15,
      returns: 22,
      returnPercent: 47,
      features: ['Daily task rewards', 'Priority support', '2x referral bonus', 'Weekly payout'],
      isPopular: true
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      duration: '7 days',
      price: 30,
      returns: 48,
      returnPercent: 60,
      features: ['Daily task rewards', 'Priority support', '3x referral bonus', 'Early payout option']
    },
    {
      id: 'elite',
      name: 'Elite Pack',
      duration: '7 days',
      price: 50,
      returns: 85,
      returnPercent: 70,
      features: ['Daily task rewards', 'VIP support', '5x referral bonus', 'Daily payouts', 'Exclusive tasks']
    }
  ];

  // User's packages (mock data)
  userPackages: UserPackage[] = [
    {
      package: {
        id: 'starter',
        name: 'Starter Pack',
        duration: '7 days',
        price: 5,
        returns: 7,
        returnPercent: 40,
        features: ['Daily task rewards', 'Basic support', 'Weekly payout']
      },
      status: 'active'
    },
    {
      package: {
        id: 'growth',
        name: 'Growth Pack',
        duration: '7 days',
        price: 15,
        returns: 22,
        returnPercent: 47,
        features: ['Daily task rewards', 'Priority support', '2x referral bonus']
      },
      status: 'pending'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  onSelectPackage(pkg: Package) {
    // Navigate to payment with selected package
    this.router.navigate(['/payment'], {
      queryParams: {
        packageId: pkg.id,
        packageName: pkg.name,
        packagePrice: pkg.price,
        packageReturns: pkg.returns
      }
    });
  }

  onViewProgress(pkg: Package) {
    // Navigate to dashboard or package details
    this.router.navigate(['/home']);
  }
}
