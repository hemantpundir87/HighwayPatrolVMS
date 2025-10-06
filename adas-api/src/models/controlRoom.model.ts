export interface ControlRoom {
  ControlRoomId?: number;         // tinyint
  ControlRoomName: string;        // nvarchar(100)
  Location: string;               // nvarchar(300)
  Latitude: number;               // decimal(9,6)
  Longitude: number;              // decimal(9,6)
  Chainage: number;               // decimal(6,3)
  DataStatus?: number;            // tinyint (0=Inactive,1=Active)
  CreatedDate?: string;           // datetime
  CreatedBy?: number;             // bigint
  ModifiedDate?: string;          // datetime
  ModifiedBy?: number;            // bigint
}
