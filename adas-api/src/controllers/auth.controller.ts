import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { executeSP } from "../db/sp.executor";
import { generateToken } from "../utils/token.helper";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password required" });
    }

    // Example: call SP or direct table to verify
    // You can replace this with your own SP (USP_UserLoginValidate)
    const users = await executeSP("USP_UserLoginValidate", { UserName: username });
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username" });
    }

    const user = users[0];

    // Compare passwords (assuming password hash stored)
    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT
    const token = generateToken({
      UserId: user.UserId,
      UserName: user.UserName,
      RoleId: user.RoleId
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        UserId: user.UserId,
        UserName: user.UserName,
        RoleId: user.RoleId
      }
    });
  } catch (err) {
    next(err);
  }
}
