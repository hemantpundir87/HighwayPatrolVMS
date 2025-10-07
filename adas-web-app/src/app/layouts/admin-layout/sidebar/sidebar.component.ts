// sidebar.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../../core/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() menus: MenuItem[] = [];
  @Input() collapsed = false;
  @Input() isDarkMode = false;

  activeId?: number;
  hoverId?: number;

  constructor(private router: Router) { }

  navigate(m: MenuItem) {
    if (m.RouteUrl) this.router.navigate([m.RouteUrl]);
    this.hoverId = undefined; // hide fly-out after click
  }
  toggle(item: MenuItem) {
    this.activeId = this.activeId === item.MenuId ? undefined : item.MenuId;
  }
  isActive(url?: string | null): boolean {
    return !!url && this.router.url === url;
  }

  //onEnter(m: MenuItem) { if (this.collapsed) this.hoverId = m.MenuId; }
  onLeave() { this.hoverId = undefined; }

  hoverY = 50;
  popupTop = 0;


  onEnter(m: MenuItem, event?: MouseEvent) {
    debugger;
    if (this.collapsed) {
      const target = event?.currentTarget as HTMLElement;
      const rect = target?.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const popupHeight = 200; // estimated initial height; adjust as needed
      const bottomSpace = viewportHeight - rect.bottom;

      // If near bottom, shift popup up so it fits on screen
      if (bottomSpace < popupHeight) {
        this.popupTop = Math.max(viewportHeight - popupHeight - 16, 8);
      } else {
        this.popupTop = rect.top;
      }

      this.hoverY = rect.top;
      this.hoverId = m.MenuId;
    }
  }
}
