import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

interface PageConfig {
  title: string;
  subtitle?: string;
  showBell?: boolean;
  showBack?: boolean;
  backRoute?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentPage: PageConfig = { title: 'Welcome back', subtitle: 'John Doe' };

  private pageConfigs: Record<string, PageConfig> = {
    '/home': { title: 'Welcome back', subtitle: 'John Doe', showBell: true },
    '/dashboard': { title: 'Welcome back', subtitle: 'John Doe', showBell: true },
    '/profile': { title: 'Profile & Settings' },
    '/history': { title: 'Transaction History', subtitle: 'All your transactions in one place' },
    '/reward': { title: 'Rewards', subtitle: 'Track your earnings and payouts' },
    '/tasks': { title: 'Daily Tasks', subtitle: 'Complete tasks to earn rewards' },
    '/packages': { title: 'Investment Packages', subtitle: 'Choose a package to start earning' },
    '/wallet': { title: 'Wallet', subtitle: 'Your wallet balance' },
    '/payment': { title: 'Complete Payment', subtitle: 'Growth Pack - $15', showBack: true, backRoute: '/packages' },
    '/notifications': { title: 'Notifications', subtitle: 'Stay updated with latest news', showBack: true, backRoute: '/dashboard' },
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePageConfig(event.urlAfterRedirects);
      });
  }

  ngOnInit() {
    this.updatePageConfig(this.router.url);
  }

  private updatePageConfig(url: string) {
    const basePath = url.split('?')[0];

    const config = this.pageConfigs[basePath] ? { ...this.pageConfigs[basePath] } : { ...this.pageConfigs['/home'] };
    if (basePath === '/payment') {
      this.route.queryParams.subscribe(params => {
        if (params['packageName'] && params['packagePrice']) {
          config.subtitle = `${params['packageName']} - $${params['packagePrice']}`;
        }
        this.currentPage = config;
      });
    } else {
      this.currentPage = config;
    }
  }

  onBellClick() {
    this.router.navigate(['/notifications']);
  }

  onBackClick() {
    if (this.currentPage.backRoute) {
      this.router.navigate([this.currentPage.backRoute]);
    }
  }
}

