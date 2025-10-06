export interface ControlRoomSetupRequest {
  ControlRoomId: number;
  ControlRoomName: string;
  Location: string;
  Latitude: number;
  Longitude: number;
  Chainage: number;
  DataStatus: number;
  CreatedBy: number;
  ModifiedBy: number;
}

export interface ControlRoomResponse {
  StatusCode?: number;
  AlertMessage?: string;
  AlertData?: string;
}
