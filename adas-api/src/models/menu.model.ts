export interface Menu {
  MenuId?: number;                // int (Primary Key)
  ParentId?: number | null;       // int, nullable (0 or NULL for top-level menu)
  MenuName: string;               // nvarchar(200)
  IconName?: string | null;       // nvarchar(100), nullable
  RouteUrl?: string | null;       // nvarchar(300), nullable
  DisplayOrder?: number | null;   // int, nullable
  DataStatus?: number | null;     // tinyint (0=Inactive,1=Active)
  CreatedDate?: string | null;    // datetime
  CreatedBy?: number | null;      // bigint
  ModifiedDate?: string | null;   // datetime
  ModifiedBy?: number | null;     // bigint
}