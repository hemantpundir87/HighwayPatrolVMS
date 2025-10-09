import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {

  constructor(private router: Router) {}

  // 🔁 Optional: If you want to handle redirect by code instead of routerLink
  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
