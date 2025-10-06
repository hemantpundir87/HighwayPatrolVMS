import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateResponse } from "../utils/common.utils";

/**
 * User Setup API — Handles insert/update of user accounts.
 * Calls stored procedure: USP_UserSetup
 */
export const userSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const body = req.body;

    logger.info("[API] [UserSetup] Request received:", body);

    const result = await executeSP("USP_UserSetup", {
      UserId: body.UserId || 0,
      FullName: body.FullName,
      Username: body.Username,
      PasswordHash: body.PasswordHash,
      EmailId: body.EmailId,
      MobileNo: body.MobileNo,
      Gender: body.Gender,
      DateOfBirth: body.DateOfBirth,
      RoleId: body.RoleId,
      ControlRoomId: body.ControlRoomId,
      PackageId: body.PackageId,
      VehicleId: body.VehicleId,
      DesignationTypeId: body.DesignationTypeId,
      LastLogin: body.LastLogin,
      IsLoggedIn: body.IsLoggedIn,
      PasswordLastChanged: body.PasswordLastChanged,
      ProfileImagePath: body.ProfileImagePath,
      DataStatus: body.DataStatus,
      CreatedBy: userId,
      ModifiedBy: userId
    });

    const response = generateResponse("USP_UserSetup", result);
    logger.info("[API] [UserSetup] Response:", response);
    res.status(response.StatusCode).json(response);
  } catch (error: any) {
    logger.error("[API] [UserSetup] Exception:", error);
    res.status(500).json({
      StatusCode: 500,
      AlertMessage: "Internal Server Error",
      AlertData: error.message
    });
  }
};
