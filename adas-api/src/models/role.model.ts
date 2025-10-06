/**
 * Represents a single record from tbl_RoleDetails
 */
export interface Role {
  RoleId?: number;               // tinyint (Primary Key)
  RoleName: string;              // nvarchar(100)
  Description?: string | null;   // nvarchar(510), nullable
  DataStatus?: number | null;    // tinyint (0=Inactive,1=Active)
  CreatedDate?: string | null;   // datetime
  CreatedBy?: number | null;     // bigint
  ModifiedDate?: string | null;  // datetime
  ModifiedBy?: number | null;    // bigint
}
