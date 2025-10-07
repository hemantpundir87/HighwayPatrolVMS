import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateSetupResponse, handleDatalist, handleErrorMessageResponse } from "../utils/common.utils";

/**
 * Menu Fetch API — Returns menu list based on RoleId
 * Calls stored procedure: USP_GetMenuByRole
 */
export const getMenuByRole = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const roleId = Number(req.params.roleId) || 0;
        const userId = (req as any).user?.UserId || 0;
        logger.info(`[API] [Menu] Request received: RoleId=${roleId}, UserId=${userId}`);

        const result = await executeSP("USP_GetMenuByRole", { RoleId: roleId });
        handleDatalist(result, res);
    } catch (error: any) {
        logger.error("[API] [Menu] Exception:", error);
        handleErrorMessageResponse(error.message || error, res, 500)
    }
};

/**
 * Menu Setup API — Handles insert/update of menu items.
 * Calls stored procedure: USP_MenuSetup
 * (optional if you want to allow CRUD for menu master)
 */
export const menuSetup = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.UserId || 0;
        const body = req.body;

        logger.info("[API] [MenuSetup] Request received:", body);

        const result = await executeSP("USP_MenuSetup", {
            MenuId: body.MenuId || 0,
            ParentId: body.ParentId || 0,
            MenuName: body.MenuName,
            IconName: body.IconName,
            RouteUrl: body.RouteUrl,
            DisplayOrder: body.DisplayOrder || 0,
            DataStatus: body.DataStatus,
            CreatedBy: userId,
            ModifiedBy: userId
        });

        const response = generateSetupResponse("USP_MenuSetup", result);
        logger.info("[API] [MenuSetup] Response:", response);

        res.status(response.StatusCode).json(response);
    } catch (error: any) {
        logger.error("[API] [MenuSetup] Exception:", error);
        res.status(500).json({
            StatusCode: 500,
            AlertMessage: "Internal Server Error",
            AlertData: error.message
        });
    }
};
