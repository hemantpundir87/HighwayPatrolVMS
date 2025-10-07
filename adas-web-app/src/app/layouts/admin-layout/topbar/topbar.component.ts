import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  user = {
    name: localStorage.getItem('userName') || 'Admin'
  };

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
