import { Component, HostBinding, OnInit } from '@angular/core';
import { MenuItem, MenuService } from '../../core/services/menu.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  menuItems: MenuItem[] = [];
  sidebarCollapsed = false;
  isDarkMode = false;
  @HostBinding('class.dark') isDark = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    const roleId = Number(localStorage.getItem('adas.roleId') ?? -1)
    this.menuService.getMenuByRole(roleId).subscribe({
      next: (menus) => {
        this.menuItems = menus;
        
      },
      error: (err) => console.error('❌ Menu Load Error:', err)
    });
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.sidebarCollapsed = localStorage.getItem('sidebar') === 'collapsed';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    localStorage.setItem('sidebar', this.sidebarCollapsed ? 'collapsed' : 'expanded');
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  onLogout(): void {
    this.menuService.clearCache();
    localStorage.clear();
    window.location.href = '/login';
  }
}
