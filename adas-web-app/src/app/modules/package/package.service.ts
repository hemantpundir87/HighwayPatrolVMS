import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

export interface Package {
  PackageId?: number;                 // tinyint (Primary Key)
  ControlRoomId?: number | null;      // tinyint, nullable (FK to tbl_ControlRoomDetails)

  StartLatitude?: number | null;      // decimal(9,6), nullable
  StartLongitude?: number | null;     // decimal(9,6), nullable
  StartChainage?: number | null;      // decimal(6,3), nullable
  EndLatitude?: number | null;        // decimal(9,6), nullable
  EndLongitude?: number | null;       // decimal(9,6), nullable
  EndChainage?: number | null;        // decimal(6,3), nullable

  DataStatus?: 0 | 1 | 2 | null;      // 0=Deleted, 1=Active, 2=Inactive
  CreatedDate?: string | null;        // datetime (ISO string)
  CreatedBy?: number | null;          // bigint (User ID)
  ModifiedDate?: string | null;       // datetime (ISO string)
  ModifiedBy?: number | null;         // bigint (User ID)
}


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private controller = '/package'; // 👈 controller name only

  constructor(private api: ApiService) { }


  getAll(): Observable<any> {
    return this.api.get(`${this.controller}/getAll`);
  }


  savePackage(data: Partial<Package>): Observable<any> {
  const payload = {
    PackageId: data.PackageId ?? 0,
    ControlRoomId: data.ControlRoomId ?? null,

    StartLatitude: data.StartLatitude ? parseFloat(String(data.StartLatitude)) : null,
    StartLongitude: data.StartLongitude ? parseFloat(String(data.StartLongitude)) : null,
    StartChainage: data.StartChainage ? parseFloat(String(data.StartChainage)) : null,
    EndLatitude: data.EndLatitude ? parseFloat(String(data.EndLatitude)) : null,
    EndLongitude: data.EndLongitude ? parseFloat(String(data.EndLongitude)) : null,
    EndChainage: data.EndChainage ? parseFloat(String(data.EndChainage)) : null,

    DataStatus: data.DataStatus ?? 1,  // default Active
    CreatedBy: data.CreatedBy ?? null,
    ModifiedBy: data.ModifiedBy ?? null,
  };

  return this.api.post(`${this.controller}/setup`, payload);
}


 
  getById(id: number): Observable<any> {
    return this.api.get(`${this.controller}/getById/${id}`);
  }

  
  delete(id: number): Observable<any> {
    return this.api.delete(`${this.controller}/delete/${id}`);
  }
}
