import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = new BehaviorSubject<ToastMessage[]>([]);
  toastState$ = this.toasts.asObservable();

  show(text: string, type: ToastMessage['type'] = 'info', duration = 4000) {
    const id = Date.now();
    const toast: ToastMessage = { id, text, type, duration };
    this.toasts.next([...this.toasts.value, toast]);
    setTimeout(() => this.remove(id), duration);
  }

  remove(id: number) {
    const updated = this.toasts.value.filter((t) => t.id !== id);
    this.toasts.next(updated);
  }
}
