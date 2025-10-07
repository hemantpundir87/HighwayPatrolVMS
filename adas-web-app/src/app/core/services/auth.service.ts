import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

interface LoginResponse {
  AccessToken: string;
  AccessTokenExpired: string;
  UserData: {
    UserId: number;
    FullName: string;
    UserName: string;
    RoleId: number;
    RoleName: string;
    ControlRoomId: number;
    VehicleId: number;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService, private token: TokenService) {}
  login(username: string, password: string): Observable<LoginResponse> {
    return this.api.post<LoginResponse>('/auth/login', { username, password }).pipe(
      map((res) => {
        if (res.AccessToken) {
          this.token.set(res.AccessToken);
          localStorage.setItem('adas.token_expiry', res.AccessTokenExpired);
          localStorage.setItem('adas.user', JSON.stringify(res.UserData));
          localStorage.setItem('adas.roleId', res.UserData.RoleId.toString());
          localStorage.setItem('adas.userName', res.UserData.FullName);
        }
        return res;
      })
    );
  }

  logout() {
    this.token.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('roleId');
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return this.token.isLoggedIn();
  }
}
