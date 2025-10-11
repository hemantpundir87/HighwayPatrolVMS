import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  text: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private toastState = new BehaviorSubject<Toast[]>([]);
  toastState$ = this.toastState.asObservable();

  private counter = 0;

  // ✅ Public alert methods
  success(msg: string): void {
    this.show(msg, 'success');
  }

  error(msg: string): void {
    this.show(msg, 'error');
  }

  warning(msg: string): void {
    this.show(msg, 'warning');
  }

  info(msg: string): void {
    this.show(msg, 'info');
  }

  // ✅ Generic add toast
  show(message: string, type: Toast['type'] = 'info', timeout = 3500): void {
    const id = ++this.counter;
    const toast: Toast = { id, text: message, type };
    this.toasts.push(toast);
    this.toastState.next([...this.toasts]);

    // auto-remove
    setTimeout(() => this.remove(id), timeout);
  }

  // ✅ Remove toast by ID
  remove(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.toastState.next([...this.toasts]);
  }
}
