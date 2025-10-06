import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET || "softomation_secret_key";

export const generateToken = (payload: object,expiresIn: string | number = "1d"): { token: string; formattedExpiry: string | number } => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 1);
  const formattedExpiry =expiryDate.getFullYear() +"-" +String(expiryDate.getMonth() + 1).padStart(2, "0") +
    "-" +String(expiryDate.getDate()).padStart(2, "0") +" " +String(expiryDate.getHours()).padStart(2, "0") +
    ":" +String(expiryDate.getMinutes()).padStart(2, "0") +":" +String(expiryDate.getSeconds()).padStart(2, "0");
  const options: SignOptions = { expiresIn: expiresIn as any };
  const token = jwt.sign(payload, SECRET, options);
  return { token, formattedExpiry };
};


export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
