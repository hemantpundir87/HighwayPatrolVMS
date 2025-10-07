export interface AuthenticatedUser {
  UserId: number;
  RoleId?: number;
  UserName?: string;
  ControlRoomId?: number;
  VehicleId?: number;
}