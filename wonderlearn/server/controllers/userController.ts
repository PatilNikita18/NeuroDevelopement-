// import { Response } from "express";
// import { clerkClient } from "@clerk/express";
// import User from "../models/User";
// import { AuthenticatedRequest } from "../middleware/authMiddleware";

// /**
//  * Asks Clerk directly what auth method this user actually used, instead of
//  * trusting whatever the frontend sends in the request body. This is what
//  * stops someone from POSTing { authProvider: "google" } for a plain
//  * email/password account (or the reverse).
//  */
// async function resolveAuthInfo(clerkUserId: string) {
//   const clerkUser = await clerkClient.users.getUser(clerkUserId);

//   const isGoogle = clerkUser.externalAccounts?.some(
//     (account) => account.provider === "oauth_google" || account.provider === "google"
//   );

//   const authProvider: "email" | "google" = isGoogle ? "google" : "email";

//   const hasPassword =
//     typeof clerkUser.passwordEnabled === "boolean"
//       ? clerkUser.passwordEnabled
//       : authProvider !== "google";

//   const primaryEmail =
//     clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
//       ?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;

//   return { authProvider, hasPassword, primaryEmail };
// }

// // POST /api/users/profile
// // Called once from Register.tsx (after email verification) and once from
// // Welcome.tsx / onboarding (after Google sign-in). Upserts the profile.
// export const createOrUpdateUser = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const clerkUserId = req.clerkUserId;

//     if (!clerkUserId) {
//       return res.status(401).json({ success: false, message: "Unauthorized." });
//     }

//     const { child, preferences, sessionDuration } = req.body;

//     if (!child?.name) {
//       return res.status(400).json({ success: false, message: "Child name is required." });
//     }

//     const { authProvider, hasPassword, primaryEmail } = await resolveAuthInfo(clerkUserId);

//     if (!primaryEmail) {
//       return res.status(400).json({ success: false, message: "Could not resolve an email for this account." });
//     }

//     const user = await User.findOneAndUpdate(
//       { clerkUserId },
//       {
//         clerkUserId,
//         email: primaryEmail,
//         authProvider,
//         hasPassword,
//         child: {
//           name: child.name,
//           nickname: child.nickname || "",
//           avatar: child.avatar || "😊",
//           ageRange: child.ageRange,
//           age: child.age,
//           condition: child.condition,
//         },
//         preferences: preferences || [],
//         sessionDuration: sessionDuration || 10,
//         profileCompleted: true,
//         lastLoginAt: new Date(),
//       },
//       { new: true, upsert: true, runValidators: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "User profile saved successfully.",
//       user,
//     });
//   } catch (error) {
//     console.error("Create/update user error:", error);
//     return res.status(500).json({ success: false, message: "Failed to save user profile." });
//   }
// };

// // GET /api/users/profile
// // Used by ProfileGate on the frontend: 404 -> send the user to /onboarding,
// // 200 -> the profile exists, render the protected page.
// export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const clerkUserId = req.clerkUserId;

//     if (!clerkUserId) {
//       return res.status(401).json({ success: false, message: "Unauthorized." });
//     }

//     const user = await User.findOne({ clerkUserId });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "Profile not found." });
//     }

//     user.lastLoginAt = new Date();
//     await user.save();

//     return res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Get profile error:", error);
//     return res.status(500).json({ success: false, message: "Failed to fetch user profile." });
//   }
// };





// import { Request, Response } from "express";
// import User from "../models/User.js";

// // CREATE USER
// export const createUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { name, email, age, condition, learningLevel } = req.body;

//     // Basic validation
//     if (!name || !email || age === undefined) {
//       res.status(400).json({
//         success: false,
//         message: "Name, email and age are required"
//       });

//       return;
//     }

//     // Check if email already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       res.status(409).json({
//         success: false,
//         message: "User with this email already exists"
//       });

//       return;
//     }

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       age,
//       condition,
//       learningLevel
//     });

//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user
//     });
//   } catch (error) {
//     console.error("Create user error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error while creating user"
//     });
//   }
// };

// // GET ALL USERS
// export const getUsers = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const users = await User.find();

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       users
//     });
//   } catch (error) {
//     console.error("Get users error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching users"
//     });
//   }
// };

// // GET USER BY ID
// export const getUserById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);

//     if (!user) {
//       res.status(404).json({
//         success: false,
//         message: "User not found"
//       });

//       return;
//     }

//     res.status(200).json({
//       success: true,
//       user
//     });
//   } catch (error) {
//     console.error("Get user error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Invalid user ID or server error"
//     });
//   }
// };

// // UPDATE USER
// export const updateUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByIdAndUpdate(
//       id,
//       req.body,
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!user) {
//       res.status(404).json({
//         success: false,
//         message: "User not found"
//       });

//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       user
//     });
//   } catch (error) {
//     console.error("Update user error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Invalid user ID or server error"
//     });
//   }
// };

// // DELETE USER
// export const deleteUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       res.status(404).json({
//         success: false,
//         message: "User not found"
//       });

//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "User deleted successfully"
//     });
//   } catch (error) {
//     console.error("Delete user error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Invalid user ID or server error"
//     });
//   }
// };


// import { Request, Response } from "express";
// import User from "../models/User.js";

// export const createUser = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     console.log("📥 Registration request received:");
//     console.log(req.body);

//     const {
//       clerkId,
//       name,
//       email,
//       nickname,
//       avatar,
//       ageRange,
//       condition,
//       preferences,
//       sessionDuration,
//     } = req.body;

//     // Validate required fields
//     if (!clerkId) {
//       return res.status(400).json({
//         success: false,
//         message: "Clerk ID is required",
//       });
//     }

//     if (!name || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "Name and email are required",
//       });
//     }

//     if (!ageRange) {
//       return res.status(400).json({
//         success: false,
//         message: "Age range is required",
//       });
//     }

//     if (!condition) {
//       return res.status(400).json({
//         success: false,
//         message: "Condition is required",
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({
//       clerkId,
//     });

//     if (existingUser) {
//       console.log("ℹ️ User already exists:", existingUser._id);

//       return res.status(200).json({
//         success: true,
//         message: "User already exists",
//         user: existingUser,
//       });
//     }

//     // Create MongoDB user
//     const user = await User.create({
//       clerkId,
//       name,
//       email,
//       nickname: nickname || "",
//       avatar: avatar || "😊",
//       ageRange,
//       condition,
//       preferences: preferences || [],
//       sessionDuration: sessionDuration || 10,
//     });

//     console.log("✅ User saved to MongoDB:", user._id);

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user,
//     });
//   } catch (error: any) {
//     console.error("❌ Error creating user:");

//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error?.message ||
//         "Failed to create user",
//     });
//   }
// };

// export const getUsers = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const users = await User.find();

//     return res.status(200).json({
//       success: true,
//       users,
//     });
//   } catch (error: any) {
//     console.error("❌ Error getting users:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to get users",
//     });
//   }
// };

// export const getUserById = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error: any) {
//     console.error("❌ Error getting user:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to get user",
//     });
//   }
// };

// export const updateUser = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       user,
//     });
//   } catch (error: any) {
//     console.error("❌ Error updating user:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update user",
//     });
//   }
// };

// export const deleteUser = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const user = await User.findByIdAndDelete(
//       req.params.id
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });
//   } catch (error: any) {
//     console.error("❌ Error deleting user:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete user",
//     });
//   }
// };


// final working code - correct
// import { Request, Response } from "express";
// import User from "../models/User.js";


// // ============================================
// // CREATE USER
// // ============================================

// export const createUser = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     console.log("=================================");
//     console.log("📥 Registration request received");
//     console.log("Request Body:", req.body);
//     console.log("=================================");

//     const {
//       clerkId,
//       name,
//       email,
//       nickname,
//       avatar,
//       ageRange,
//       condition,
//       preferences,
//       sessionDuration,
//     } = req.body;


//     // ========================================
//     // VALIDATION
//     // ========================================

//     if (!clerkId) {
//       return res.status(400).json({
//         success: false,
//         message: "Clerk ID is required",
//       });
//     }

//     if (!name || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "Name and email are required",
//       });
//     }


//     // ========================================
//     // CHECK EXISTING USER
//     // ========================================

//     const existingUser = await User.findOne({
//       clerkId,
//     });

//     if (existingUser) {
//       console.log(
//         "ℹ️ User already exists:",
//         existingUser._id
//       );

//       return res.status(200).json({
//         success: true,
//         message: "User already exists",
//         user: existingUser,
//       });
//     }


//     // ========================================
//     // CREATE USER
//     // ========================================

//     const user = await User.create({
//       clerkId,

//       email: email.toLowerCase().trim(),

//       childName: name.trim(),

//       nickname: nickname?.trim() || "",

//       avatar: avatar || "😊",

//       ageRange: ageRange || "",

//       condition: condition || "",

//       preferences: preferences || [],

//       sessionDuration: sessionDuration || 10,
//     });


//     // ========================================
//     // SUCCESS
//     // ========================================

//     console.log("=================================");
//     console.log("✅ User saved to MongoDB");
//     console.log("User ID:", user._id);
//     console.log("Clerk ID:", user.clerkId);
//     console.log("Email:", user.email);
//     console.log("Child Name:", user.childName);
//     console.log("Nickname:", user.nickname);
//     console.log("Avatar:", user.avatar);
//     console.log("=================================");


//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",

//       user: {
//         id: user._id,
//         clerkId: user.clerkId,
//         email: user.email,
//         childName: user.childName,
//         nickname: user.nickname,
//         avatar: user.avatar,
//         ageRange: user.ageRange,
//         condition: user.condition,
//         preferences: user.preferences,
//         sessionDuration: user.sessionDuration,
//       },
//     });

//   } catch (error: any) {

//     console.error("=================================");
//     console.error("❌ ERROR CREATING USER");
//     console.error(error);
//     console.error("=================================");

//     return res.status(500).json({
//       success: false,
//       message:
//         error?.message ||
//         "Failed to create user",
//     });
//   }
// };


// // ============================================
// // GET ALL USERS
// // ============================================

// export const getUsers = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const users = await User.find();

//     return res.status(200).json({
//       success: true,
//       users,
//     });

//   } catch (error: any) {

//     console.error(
//       "❌ Error getting users:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to get users",
//     });
//   }
// };


// // ============================================
// // GET USER BY ID
// // ============================================

// export const getUserById = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const user = await User.findById(
//       req.params.id
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       user,
//     });

//   } catch (error: any) {

//     console.error(
//       "❌ Error getting user:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to get user",
//     });
//   }
// };


// // ============================================
// // UPDATE USER
// // ============================================

// export const updateUser = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const user =
//       await User.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//           runValidators: true,
//         }
//       );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       user,
//     });

//   } catch (error: any) {

//     console.error(
//       "❌ Error updating user:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update user",
//     });
//   }
// };


// // ============================================
// // DELETE USER
// // ============================================

// export const deleteUser = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const user =
//       await User.findByIdAndDelete(
//         req.params.id
//       );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });

//   } catch (error: any) {

//     console.error(
//       "❌ Error deleting user:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete user",
//     });
//   }
// };
// // ============================================
// // GET USER BY CLERK ID
// // ============================================
// // Used by ProfileGate on the frontend to decide /onboarding vs the
// // protected page, and by SSOCallback after a Google sign-in completes.

// export const getUserByClerkId = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const user = await User.findOne({
//       clerkId: req.params.clerkId,
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error: any) {
//     console.error("❌ Error getting user by clerkId:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to get user",
//     });
//   }
// };



//this is trial code
import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("=================================");
    console.log("📥 Registration request received");
    console.log("Request Body:", req.body);
    console.log("Mongo readyState:", mongoose.connection.readyState, "(1 = connected)");
    console.log("=================================");

    // readyState 1 = connected. If this isn't 1, nothing below will work
    // no matter what — fail immediately and loudly instead of letting
    // Mongoose buffer the query indefinitely.
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ Mongo is not connected — aborting save.");
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Check server logs / Atlas Network Access.",
      });
    }

    const {
      clerkId,
      name,
      email,
      nickname,
      avatar,
      ageRange,
      condition,
      preferences,
      sessionDuration,
    } = req.body;

    if (!clerkId) {
      return res.status(400).json({ success: false, message: "Clerk ID is required" });
    }

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      console.log("ℹ️ User already exists:", existingUser._id);
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user: existingUser,
      });
    }

    const user = await User.create({
      clerkId,
      email: email.toLowerCase().trim(),
      childName: name.trim(),
      nickname: nickname?.trim() || "",
      avatar: avatar || "😊",
      ageRange: ageRange || "",
      condition: condition || "",
      preferences: preferences || [],
      sessionDuration: sessionDuration || 10,
    });

    // Proves the write actually landed in Atlas, not just that .create()
    // resolved without throwing (which it can do even in some edge cases
    // where the connection is unhealthy but the promise still settles).
    const verify = await User.findById(user._id).lean();

    console.log("=================================");
    console.log(verify ? "✅ User saved to MongoDB (verified)" : "❌ Save reported success but verify read found nothing");
    console.log("User ID:", user._id);
    console.log("Clerk ID:", user.clerkId);
    console.log("Database:", mongoose.connection.name);
    console.log("Collection:", User.collection.name);
    console.log("=================================");

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        childName: user.childName,
        nickname: user.nickname,
        avatar: user.avatar,
        ageRange: user.ageRange,
        condition: user.condition,
        preferences: user.preferences,
        sessionDuration: user.sessionDuration,
      },
    });
  } catch (error: any) {
    console.error("=================================");
    console.error("❌ ERROR CREATING USER");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to create user",
    });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  } catch (error: any) {
    console.error("❌ Error getting users:", error);
    return res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.error("❌ Error getting user:", error);
    return res.status(500).json({ success: false, message: "Failed to get user" });
  }
};

export const getUserByClerkId = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.error("❌ Error getting user by clerkId:", error);
    return res.status(500).json({ success: false, message: "Failed to get user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, message: "User updated successfully", user });
  } catch (error: any) {
    console.error("❌ Error updating user:", error);
    return res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting user:", error);
    return res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};