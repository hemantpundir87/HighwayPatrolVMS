import { executeSP } from "../db/sp.executor";
import logger from "./logger";

export const LOGIN_STATUS = {
  SUCCESS: 1,
  FAILED: 2,
  ERROR: 3,
  DUMMY: 4,
};


export async function insertLoginActivity({
  UserId = 0,
  UserName = "UNKNOWN",
  RoleId = null,
  ControlRoomId = null,
  VehicleId = null,
  LoginStatusId = LOGIN_STATUS.ERROR,
  IpAddress = "UNKNOWN",
  DeviceTypeId = 1,
  Remarks = "",
  CreatedBy = 0,
}: {
  UserId?: number;
  UserName?: string;
  RoleId?: number | null;
  ControlRoomId?: number | null;
  VehicleId?: number | null;
  LoginStatusId?: number;
  IpAddress?: string;
  DeviceTypeId?: number;
  Remarks?: string;
  CreatedBy?: number;
}) {
  try {
    const result = await executeSP("USP_UserLoginActivityInsert", {
      UserId,
      UserName,
      RoleId,
      ControlRoomId,
      VehicleId,
      LoginStatusId,
      IpAddress,
      DeviceTypeId,
      Remarks,
      CreatedBy,
    });

    return result && result[0] ? result[0].LoginActivityId || null : null;
  } catch (error: any) {
    logger.error("Error inserting login activity:", error.message);
    return null;
  }
}

/**
 * Updates logout details (logout time & duration)
 */
export async function updateLogoutActivity(LoginActivityId: number) {
  try {
    const result = await executeSP("USP_UserLogoutActivityUpdate", {
      LoginActivityId,
    });
    return result && result[0] ? result[0] : null;
  } catch (error: any) {
    logger.error("Error updating logout activity:", error.message);
    return null;
  }
}
