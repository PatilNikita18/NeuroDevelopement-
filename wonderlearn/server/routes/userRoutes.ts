// import { Router } from "express";
// import { createOrUpdateUser, getProfile } from "../controllers/userController";
// import { requireAuth } from "../middleware/authMiddleware";

// const router = Router();

// // Order matters only in that both need requireAuth — GET and POST on the
// // same path is fine since Express distinguishes by method.
// router.get("/profile", requireAuth, getProfile);
// router.post("/profile", requireAuth, createOrUpdateUser);

// export default router;



// import express from "express";

// import {
//   createUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser
// } from "../controllers/userController.js";

// const router = express.Router();

// // POST /api/users
// router.post("/", createUser);

// // GET /api/users
// router.get("/", getUsers);

// // GET /api/users/:id
// router.get("/:id", getUserById);

// // PUT /api/users/:id
// router.put("/:id", updateUser);

// // DELETE /api/users/:id
// router.delete("/:id", deleteUser);

// export default router;




// import { Router, Request, Response } from "express";
// import User from "../models/User.js";

// const router = Router();

// /*
//   POST /api/users/register

//   Creates or updates a user in MongoDB.

//   Expected body:

//   {
//     clerkId: "...",
//     email: "...",
//     firstName: "...",
//     lastName: "..."
//   }
// */

// router.post(
//   "/register",
//   async (req: Request, res: Response): Promise<void> => {
//     try {
//       const {
//         clerkId,
//         email,
//         firstName,
//         lastName,
//       } = req.body;

//       // Validate required fields
//       if (!clerkId || !email) {
//         res.status(400).json({
//           success: false,
//           message: "clerkId and email are required",
//         });

//         return;
//       }

//       // Check whether user already exists
//       const existingUser = await User.findOne({ clerkId });

//       if (existingUser) {
//         existingUser.email = email;
//         existingUser.firstName = firstName || "";
//         existingUser.lastName = lastName || "";

//         await existingUser.save();

//         res.status(200).json({
//           success: true,
//           message: "User already exists. Information updated.",
//           user: existingUser,
//         });

//         return;
//       }

//       // Create new user
//       const user = await User.create({
//         clerkId,
//         email,
//         firstName: firstName || "",
//         lastName: lastName || "",
//       });

//       res.status(201).json({
//         success: true,
//         message: "User registered successfully",
//         user,
//       });
//     } catch (error) {
//       console.error("Registration error:", error);

//       res.status(500).json({
//         success: false,
//         message: "Server error while registering user",
//       });
//     }
//   }
// );

// /*
//   GET /api/users/:clerkId

//   Get a user from MongoDB.
// */

// router.get(
//   "/:clerkId",
//   async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { clerkId } = req.params;

//       const user = await User.findOne({ clerkId });

//       if (!user) {
//         res.status(404).json({
//           success: false,
//           message: "User not found",
//         });

//         return;
//       }

//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       console.error("Get user error:", error);

//       res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   }
// );

// export default router;




// import { Router } from "express";

// import {
//   createUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";

// const router = Router();


// // Register/Create User
// router.post(
//   "/register",
//   createUser
// );


// // Get all users
// router.get(
//   "/",
//   getUsers
// );


// // Get user by ID
// router.get(
//   "/:id",
//   getUserById
// );


// // Update user
// router.put(
//   "/:id",
//   updateUser
// );


// // Delete user
// router.delete(
//   "/:id",
//   deleteUser
// );

//final code working
// export default router;


// import { Router } from "express";

// import {
//   createUser,
//   getUsers,
//   getUserById,
//   getUserByClerkId,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";

// const router = Router();

// // Register/Create User
// router.post("/register", createUser);

// // Look up by Clerk ID — used by ProfileGate / SSOCallback
// router.get("/clerk/:clerkId", getUserByClerkId);

// // Get all users
// router.get("/", getUsers);

// // Get user by Mongo ID
// router.get("/:id", getUserById);

// // Update user
// router.put("/:id", updateUser);

// // Delete user
// router.delete("/:id", deleteUser);

// export default router;



//this is trial code 
// import { Router } from "express";

// import {
//   createUser,
//   getUsers,
//   getUserById,
//   getUserByClerkId,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";

// const router = Router();

// router.post("/register", createUser);
// router.get("/clerk/:clerkId", getUserByClerkId);
// router.get("/", getUsers);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

// export default router;



//userprofile form only 
import { Router } from "express";

import UserProfile from "../models/UserProfile.js";

const router = Router();

// ============================================================
// SAVE USER PROFILE
// ============================================================
//
// POST
// /api/users/profile
//
// ============================================================

router.post(
  "/profile",
  async (req, res) => {
    try {
      console.log(
        "📥 Profile data received:",
        req.body
      );

      const {
        clerkId,
        name,
        nickname,
        email,
        avatar,
        age,
        support,
        preferences,
        sessionLength,
      } = req.body;

      // ========================================================
      // VALIDATION
      // ========================================================

      if (!clerkId) {
        return res.status(400).json({
          success: false,
          message:
            "Clerk ID is required.",
        });
      }

      if (!name || !name.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Child's name is required.",
        });
      }

      if (!email || !email.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Email address is required.",
        });
      }

      if (!avatar) {
        return res.status(400).json({
          success: false,
          message:
            "Avatar is required.",
        });
      }

      if (
        ![
          "5-8",
          "9-12",
          "13-18",
        ].includes(age)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid age group.",
        });
      }

      if (
        ![
          "ADHD",
          "Intellectual Disability",
          "Autism",
        ].includes(support)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid learning support.",
        });
      }

      if (
        !Array.isArray(preferences) ||
        preferences.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please select at least one learning preference.",
        });
      }

      if (
        ![5, 10, 20].includes(
          Number(sessionLength)
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid session length.",
        });
      }

      // ========================================================
      // CREATE OR UPDATE PROFILE
      // ========================================================

      const profile =
        await UserProfile.findOneAndUpdate(
          {
            clerkId,
          },

          {
            clerkId,

            name: name.trim(),

            nickname:
              nickname?.trim() || "",

            email:
              email.trim().toLowerCase(),

            avatar,

            age,

            support,

            preferences,

            sessionLength:
              Number(sessionLength),
          },

          {
            new: true,

            upsert: true,

            runValidators: true,

            setDefaultsOnInsert: true,
          }
        );

      // ========================================================
      // SUCCESS
      // ========================================================

      console.log(
        "✅ Profile saved successfully"
      );

      console.log(
        "MongoDB document:",
        profile
      );

      return res.status(200).json({
        success: true,

        message:
          "User profile saved successfully.",

        profile,
      });
    } catch (error) {
      console.error(
        "❌ Error saving profile:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to save user profile.",
      });
    }
  }
);

// ============================================================
// GET PROFILE BY CLERK ID
// ============================================================
//
// GET
// /api/users/profile/:clerkId
//
// ============================================================

router.get(
  "/profile/:clerkId",
  async (req, res) => {
    try {
      const { clerkId } =
        req.params;

      const profile =
        await UserProfile.findOne({
          clerkId,
        });

      if (!profile) {
        return res.status(404).json({
          success: false,

          message:
            "User profile not found.",
        });
      }

      return res.status(200).json({
        success: true,

        profile,
      });
    } catch (error) {
      console.error(
        "❌ Error fetching profile:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to fetch user profile.",
      });
    }
  }
);

export default router;