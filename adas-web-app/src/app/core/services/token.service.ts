import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class TokenService {
  private key = environment.tokenKey;

  set(token: string) {
    localStorage.setItem(this.key, token);
  }

  get(): string | null {
    return localStorage.getItem(this.key);
  }

  clear() {
    localStorage.removeItem(this.key);
  }

  isLoggedIn(): boolean {
    return !!this.get();
  }
}
