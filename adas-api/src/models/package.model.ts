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