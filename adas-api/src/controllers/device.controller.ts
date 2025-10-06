import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateResponse } from "../utils/common.utils";

/**
 * Device Setup API — Handles insert/update operations
 * Calls stored procedure: USP_DeviceSetup
 */
export const deviceSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const body = req.body;

    logger.info("[API] [DeviceSetup] Request received:", body);

    const result = await executeSP("USP_DeviceSetup", {
      DeviceId: body.DeviceId || 0,
      DeviceName: body.DeviceName,
      DeviceTypeId: body.DeviceTypeId,
      SerialNumber: body.SerialNumber,
      IMEI: body.IMEI,
      MacAddress: body.MacAddress,
      IPAddress: body.IPAddress,
      PortNo: body.PortNo,
      LiveViewUrl: body.LiveViewUrl,
      VehicleId: body.VehicleId,
      ControlRoomId: body.ControlRoomId,
      PackageId: body.PackageId,
      InstallationDate: body.InstallationDate,
      LastHeartbeat: body.LastHeartbeat,
      DeviceStatusId: body.DeviceStatusId,
      DataStatus: body.DataStatus,
      CreatedBy: userId,
      ModifiedBy: userId
    });

    const response = generateResponse("USP_DeviceSetup", result);
    logger.info("[API] [DeviceSetup] Response:", response);
    res.status(response.StatusCode).json(response);
  } catch (error: any) {
    logger.error("[API] [DeviceSetup] Exception:", error);
    res.status(500).json({
      StatusCode: 500,
      AlertMessage: "Internal Server Error",
      AlertData: error.message
    });
  }
};
