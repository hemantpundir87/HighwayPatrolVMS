import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  constructor(private router: Router) {}

  logout(): void {
    try {
      // If you have an AuthService, call it here instead.
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    } catch (e) {
      console.error('Logout failed', e);
      this.router.navigate(['/auth/login']);
    }
  }
}
