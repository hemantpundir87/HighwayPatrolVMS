import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateResponse } from "../utils/common.utils";

export const controlRoomSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const body = req.body;

    const result = await executeSP("USP_ControlRoomSetup", {
      ControlRoomId: body.ControlRoomId || 0,
      ControlRoomName: body.ControlRoomName,
      Location: body.Location,
      Latitude: body.Latitude,
      Longitude: body.Longitude,
      Chainage: body.Chainage,
      DataStatus: body.DataStatus,
      CreatedBy: userId,
      ModifiedBy: userId
    });

    const response = generateResponse("USP_ControlRoomSetup", result);
    logger.info(`[ControlRoomSetup]`, response);
    res.status(response.StatusCode).json(response);
  } catch (error: any) {
    logger.error("[ControlRoomSetup] Exception:", error);
    res.status(500).json({
      StatusCode: 500,
      AlertMessage: "Internal Server Error",
      AlertData: error.message,
    });
  }
};
