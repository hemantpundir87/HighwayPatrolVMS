import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateSetupResponse, handleDatalist, handleErrorMessageResponse } from "../utils/common.utils";


export const getAllPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const controlRoomId = Number(req.query.ControlRoomId || 0);
    const result = await executeSP("USP_PackageDetailsGetAll", { ControlRoomId: controlRoomId });
    handleDatalist(result, res);
  } catch (error: any) {
    logger.error("[PackageGetAll] Exception:", error);
    handleErrorMessageResponse(error, res, 500);
  }
};

export const packageSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const body = req.body;

    const result = await executeSP("USP_PackageDetailsSetup", {
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


    generateSetupResponse("USP_PackageDetailsSetup", result, res);
  } catch (error: any) {
    logger.error("[PackageSetup] Exception:", error);
    handleErrorMessageResponse(error, res, 500);
  }
};


