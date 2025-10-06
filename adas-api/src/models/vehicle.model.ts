/**
 * Represents a single record from tbl_VehicleDetails
 */
export interface Vehicle {
  VehicleId?: number;                    // int (Primary Key)
  VehicleNumber: string;                 // nvarchar(40)
  VehicleTypeId?: number | null;         // tinyint, nullable
  Make?: string | null;                  // nvarchar(200)
  Model?: string | null;                 // nvarchar(200)
  ManufacturingYear?: number | null;     // int, nullable
  EngineNumber?: string | null;          // nvarchar(100)
  ChassisNumber?: string | null;         // nvarchar(100)
  RCNumber?: string | null;              // nvarchar(200)
  RegistrationDate?: string | null;      // date, nullable (YYYY-MM-DD)
  RegistrationAuthority?: string | null; // nvarchar(200)
  OwnerName?: string | null;             // nvarchar(200)
  OwnerAddress?: string | null;          // nvarchar(510)
  FitnessCertificateNo?: string | null;  // nvarchar(200)
  FitnessValidTill?: string | null;      // date, nullable
  PUCCNumber?: string | null;            // nvarchar(200)
  PUCCValidTill?: string | null;         // date, nullable
  InsurancePolicyNo?: string | null;     // nvarchar(200)
  InsuranceCompany?: string | null;      // nvarchar(300)
  InsuranceValidTill?: string | null;    // date, nullable
  ControlRoomId?: number | null;         // int, nullable (FK)
  PackageId?: number | null;             // int, nullable (FK)
  LpuDeviceId?: number | null;           // int, nullable
  TabDeviceId?: number | null;           // int, nullable
  GPSDeviceId?: number | null;           // int, nullable
  FrontDeviceId?: number | null;         // int, nullable
  RearDeviceId?: number | null;          // int, nullable
  DashDeviceId?: number | null;          // int, nullable
  BodyDeviceId?: number | null;          // int, nullable
  GsmDeviceId?: number | null;           // int, nullable
  LastSyncTime?: string | null;          // datetime, nullable (ISO format)
  Remarks?: string | null;               // nvarchar(510)
  DataStatus?: number | null;            // tinyint (0=Inactive,1=Active)
  CreatedDate?: string | null;           // datetime
  CreatedBy?: number | null;             // bigint
  ModifiedDate?: string | null;          // datetime
  ModifiedBy?: number | null;            // bigint
}
