import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateSetupResponse, handleDatalist, handleErrorMessageResponse } from "../utils/common.utils";

export const getAllControlRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const result = await executeSP("USP_ControlRoomGetAll", { UserId: userId });
    handleDatalist(result, res);
  } catch (error: any) {
    logger.error("[ControlRoomGetAll] Exception:", error);
    handleErrorMessageResponse(error, res, 500)
  }
};


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

    const response = generateSetupResponse("USP_ControlRoomSetup", result);
    res.status(response.StatusCode).json(response);
  } catch (error: any) {
    handleErrorMessageResponse(error, res, 500)
  }
};
