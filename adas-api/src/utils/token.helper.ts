import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET || "softomation_secret_key";

/**
 * Generate JWT Token
 */
export const generateToken = (
  payload: object,
  // accept string | number and silence the overly-strict type check
  expiresIn: string | number = "1d"
): string => {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, SECRET, options);
};

/**
 * Verify JWT Token
 */
export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
