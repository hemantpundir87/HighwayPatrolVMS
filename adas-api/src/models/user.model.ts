/**
 * Represents a single record from tbl_UserDetails
 */
export interface User {
  UserId?: number;                   // bigint (Primary Key)
  FullName: string;                  // nvarchar(200)
  Username: string;                  // nvarchar(100)
  PasswordHash: string;              // nvarchar(510)
  EmailId?: string | null;           // nvarchar(200), nullable
  MobileNo?: string | null;          // nvarchar(30), nullable
  Gender?: string | null;            // nvarchar(20), nullable
  DateOfBirth?: string | null;       // date, nullable (ISO format: YYYY-MM-DD)
  RoleId: number;                    // tinyint (FK to tbl_RoleDetails)
  ControlRoomId?: number | null;     // tinyint (FK to tbl_ControlRoomDetails)
  PackageId?: number | null;         // tinyint (FK to tbl_PackageMaster)
  VehicleId?: number | null;         // int (FK to tbl_VehicleDetails)
  DesignationTypeId?: number | null; // tinyint, nullable
  LastLogin?: string | null;         // datetime, nullable (ISO 8601)
  IsLoggedIn?: boolean | null;       // bit
  PasswordLastChanged?: string | null; // datetime
  ProfileImagePath?: string | null;  // nvarchar(510)
  DataStatus?: number | null;        // tinyint (0=Inactive,1=Active)
  CreatedDate?: string | null;       // datetime
  CreatedBy?: number | null;         // bigint
  ModifiedDate?: string | null;      // datetime
  ModifiedBy?: number | null;        // bigint
}
