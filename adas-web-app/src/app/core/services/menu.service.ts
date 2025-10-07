import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ApiService } from './api.service';

export interface MenuItem {
  MenuId: number;
  ParentId: number; // 0 = root
  MenuName: string;
  IconName?: string | null;
  RouteUrl?: string | null;
  DisplayOrder?: number;
  RoleId?: number;

  // Permission flags (0 or 1)
  CanView?: number;
  CanAdd?: number;
  CanUpdate?: number;
  CanDelete?: number;
  CanExport?: number;
  CanApprove?: number;

  ChildCount?: number;
  DataStatus?: number;
  children?: MenuItem[];
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private cache = new Map<number, MenuItem[]>(); // ⚡ in-memory cache

  constructor(private api: ApiService) {}

  /** Fetch menus for a specific role */
  getMenuByRole(roleId: number): Observable<MenuItem[]> {
    // 1️⃣ Check in-memory cache
    if (this.cache.has(roleId)) {
      return of(this.cache.get(roleId)!);
    }

    // 2️⃣ Check localStorage cache
    const cacheKey = `menu_${roleId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached) as MenuItem[];
      this.cache.set(roleId, parsed);
      return of(parsed);
    }

    // 3️⃣ Fetch from API
    return this.api.get<MenuItem[]>(`/menu/${roleId}`).pipe(
      map((list) => {
        const tree = this.buildTree(list);
        this.cache.set(roleId, tree);
        localStorage.setItem(cacheKey, JSON.stringify(tree));
        return tree;
      })
    );
  }

  /** Clear cached menu data (use on logout) */
  clearCache(): void {
    this.cache.clear();
    Object.keys(localStorage)
      .filter((k) => k.startsWith('menu_'))
      .forEach((k) => localStorage.removeItem(k));
  }

  /** Convert flat menu list to nested tree */
  private buildTree(list: MenuItem[]): MenuItem[] {
    const map = new Map<number, MenuItem>();

    // Initialize each node with empty children
    list.forEach((item) => map.set(item.MenuId, { ...item, children: [] }));

    const roots: MenuItem[] = [];

    // Build hierarchy
    list.forEach((item) => {
      if (item.ParentId && map.has(item.ParentId)) {
        map.get(item.ParentId)!.children!.push(map.get(item.MenuId)!);
      } else {
        roots.push(map.get(item.MenuId)!);
      }
    });

    // Recursive sorting by DisplayOrder
    const sortRecursively = (nodes: MenuItem[]) => {
      nodes.sort((a, b) => (a.DisplayOrder ?? 0) - (b.DisplayOrder ?? 0));
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          sortRecursively(node.children);
        }
      });
    };

    sortRecursively(roots);
    return roots;
  }
}
