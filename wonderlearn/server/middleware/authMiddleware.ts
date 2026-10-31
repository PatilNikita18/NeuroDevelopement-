import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

export interface AuthenticatedRequest extends Request {
  clerkUserId?: string;
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login.",
      });
    }

    req.clerkUserId = userId;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};