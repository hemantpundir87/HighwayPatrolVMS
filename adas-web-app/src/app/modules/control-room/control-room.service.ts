import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

export interface ControlRoom {
  ControlRoomId: number;
  ControlRoomName: string;
  Location: string;
  Latitude: number;
  Longitude: number;
  Chainage: string;
  DataStatus: number;
  CreatedBy?: number;
  ModifiedBy?: number;
  CreatedDate?: string;
  ModifiedDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ControlRoomService {

  private controller = '/controlroom'; // 👈 controller name only

  constructor(private api: ApiService) {}

  /**
   * 🔹 Get all control room records
   */
  getAll(): Observable<any> {
    return this.api.get(`${this.controller}/getAll`);
  }

  /**
   * 🔹 Create or update a control room
   */
  saveControlRoom(payload: Partial<ControlRoom>): Observable<any> {
    return this.api.post(`${this.controller}/setup`, payload);
  }

  /**
   * 🔹 Get control room by ID
   */
  getById(id: number): Observable<any> {
    return this.api.get(`${this.controller}/getById/${id}`);
  }

  /**
   * 🔹 Delete control room by ID (optional)
   */
  delete(id: number): Observable<any> {
    return this.api.delete(`${this.controller}/delete/${id}`);
  }
}
