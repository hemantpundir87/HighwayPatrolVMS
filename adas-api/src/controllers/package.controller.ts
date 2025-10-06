import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateResponse } from "../utils/common.utils";

export const packageSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const body = req.body;

    const result = await executeSP("USP_PackageSetup", {
      PackageId: body.PackageId || 0,
      ControlRoomId: body.ControlRoomId,
      StartLatitude: body.StartLatitude,
      StartLongitude: body.StartLongitude,
      StartChainage: body.StartChainage,
      EndLatitude: body.EndLatitude,
      EndLongitude: body.EndLongitude,
      EndChainage: body.EndChainage,
      DataStatus: body.DataStatus,
      CreatedBy: userId,
      ModifiedBy: userId
    });

    const response = generateResponse("USP_PackageSetup", result);
    logger.info(`[PackageSetup]`, response);
    res.status(response.StatusCode).json(response);
  } catch (error: any) {
    logger.error("[PackageSetup] Exception:", error);
    res.status(500).json({
      StatusCode: 500,
      AlertMessage: "Internal Server Error",
      AlertData: error.message,
    });
  }
};
