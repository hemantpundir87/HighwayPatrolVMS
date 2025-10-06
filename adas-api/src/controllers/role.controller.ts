import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateResponse } from "../utils/common.utils";

/**
 * Role Setup API — Handles creation and update of roles.
 * Calls stored procedure: USP_RoleSetup
 */
export const roleSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const body = req.body;

    logger.info("[API] [RoleSetup] Request received:", body);

    const result = await executeSP("USP_RoleSetup", {
      RoleId: body.RoleId || 0,
      RoleName: body.RoleName,
      Description: body.Description,
      DataStatus: body.DataStatus,
      CreatedBy: userId,
      ModifiedBy: userId
    });

    const response = generateResponse("USP_RoleSetup", result);
    logger.info("[API] [RoleSetup] Response:", response);

    res.status(response.StatusCode).json(response);
  } catch (error: any) {
    logger.error("[API] [RoleSetup] Exception:", error);
    res.status(500).json({
      StatusCode: 500,
      AlertMessage: "Internal Server Error",
      AlertData: error.message
    });
  }
};
