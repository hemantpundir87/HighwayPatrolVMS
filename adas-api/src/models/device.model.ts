/**
 * Represents a single record from tbl_DeviceDetails
 */
export interface Device {
  DeviceId?: number;               // int (Primary Key)
  DeviceName: string;              // nvarchar(200)
  DeviceTypeId: number;            // tinyint
  SerialNumber?: string | null;    // nvarchar(200), nullable
  IMEI?: string | null;            // nvarchar(100), nullable
  MacAddress?: string | null;      // nvarchar(100), nullable
  IPAddress?: string | null;       // nvarchar(100), nullable
  PortNo?: number | null;          // int, nullable
  LiveViewUrl?: string | null;     // nvarchar(510), nullable
  VehicleId?: number | null;       // int, nullable (FK to Vehicle)
  ControlRoomId?: number | null;   // tinyint, nullable (FK to ControlRoom)
  PackageId?: number | null;       // tinyint, nullable (FK to Package)
  InstallationDate?: string | null;// datetime, nullable
  LastHeartbeat?: string | null;   // datetime, nullable
  DeviceStatusId?: number | null;  // tinyint, nullable
  DataStatus?: number | null;      // tinyint (0=Inactive,1=Active)
  CreatedDate?: string | null;     // datetime
  CreatedBy?: number | null;       // bigint
  ModifiedDate?: string | null;    // datetime
  ModifiedBy?: number | null;      // bigint
}
