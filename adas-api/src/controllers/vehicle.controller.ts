import { Request, Response } from "express";
import { executeSP } from "../db/sp.executor";
import { logger } from "../utils/logger";
import { generateSetupResponse } from "../utils/common.utils";

/**
 * Vehicle Setup API — Handles Insert / Update operations
 * Calls stored procedure: USP_VehicleSetup
 */
export const vehicleSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.UserId || 0;
    const body = req.body;

    logger.info("[API] [VehicleSetup] Request received:", body);

    const result = await executeSP("USP_VehicleSetup", {
      VehicleId: body.VehicleId || 0,
      VehicleNumber: body.VehicleNumber,
      VehicleTypeId: body.VehicleTypeId,
      Make: body.Make,
      Model: body.Model,
      ManufacturingYear: body.ManufacturingYear,
      EngineNumber: body.EngineNumber,
      ChassisNumber: body.ChassisNumber,
      RCNumber: body.RCNumber,
      RegistrationDate: body.RegistrationDate,
      RegistrationAuthority: body.RegistrationAuthority,
      OwnerName: body.OwnerName,
      OwnerAddress: body.OwnerAddress,
      FitnessCertificateNo: body.FitnessCertificateNo,
      FitnessValidTill: body.FitnessValidTill,
      PUCCNumber: body.PUCCNumber,
      PUCCValidTill: body.PUCCValidTill,
      InsurancePolicyNo: body.InsurancePolicyNo,
      InsuranceCompany: body.InsuranceCompany,
      InsuranceValidTill: body.InsuranceValidTill,
      ControlRoomId: body.ControlRoomId,
      PackageId: body.PackageId,
      LpuDeviceId: body.LpuDeviceId,
      TabDeviceId: body.TabDeviceId,
      GPSDeviceId: body.GPSDeviceId,
      FrontDeviceId: body.FrontDeviceId,
      RearDeviceId: body.RearDeviceId,
      DashDeviceId: body.DashDeviceId,
      BodyDeviceId: body.BodyDeviceId,
      GsmDeviceId: body.GsmDeviceId,
      LastSyncTime: body.LastSyncTime,
      Remarks: body.Remarks,
      DataStatus: body.DataStatus,
      CreatedBy: userId,
      ModifiedBy: userId
    });

    const response = generateSetupResponse("USP_VehicleSetup", result);
    logger.info("[API] [VehicleSetup] Response:", response);
    res.status(response.StatusCode).json(response);
  } catch (error: any) {
    logger.error("[API] [VehicleSetup] Exception:", error);
    res.status(500).json({
      StatusCode: 500,
      AlertMessage: "Internal Server Error",
      AlertData: error.message
    });
  }
};
