export interface Package {
  PackageId?: number;                 // tinyint (Primary Key)
  ControlRoomId?: number | null;      // tinyint, nullable (FK to tbl_ControlRoomDetails)
  StartLatitude?: number | null;      // decimal(9,6), nullable
  StartLongitude?: number | null;     // decimal(9,6), nullable
  StartChainage?: number | null;      // decimal(6,3), nullable
  EndLatitude?: number | null;        // decimal(9,6), nullable
  EndLongitude?: number | null;       // decimal(9,6), nullable
  EndChainage?: number | null;        // decimal(6,3), nullable
  DataStatus?: number | null;         // tinyint (0=Inactive,1=Active)
  CreatedDate?: string | null;        // datetime
  CreatedBy?: number | null;          // bigint
  ModifiedDate?: string | null;       // datetime
  ModifiedBy?: number | null;         // bigint
}
