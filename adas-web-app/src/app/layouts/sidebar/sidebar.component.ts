import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../core/services/menu.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() menus: MenuItem[] = [];
  @Input() collapsed = false;
  @Input() isDarkMode = false;
  activeId?: number;

  constructor(private router: Router) {}

  navigate(m: MenuItem) {
    if (m.RouteUrl) this.router.navigate([m.RouteUrl]);
  }

  toggle(item: MenuItem) {
    this.activeId = this.activeId === item.MenuId ? undefined : item.MenuId;
  }

  isActive(url?: string | null): boolean {
    return !!url && this.router.url === url;
  }
}
