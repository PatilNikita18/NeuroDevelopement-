import {
  Router,
  Request,
  Response,
} from "express";

import UserProfile from "../models/UserProfile.js";

import AssessmentResult from "../models/AssessmentResult.js";

const router = Router();

// ============================================================
// SAVE PRE-ASSESSMENT
// ============================================================
//
// POST
// /api/assessment/results
//
// Frontend sends:
//
// {
//   clerkId,
//   scores,
//   activities,
//   completedAt
// }
//
// Backend automatically gets:
//
// userName
// email
// childName
// ageGroup
// support
//
// from UserProfile.
//
// ============================================================

router.post(
  "/results",
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {
        clerkId,
        scores,
        activities,
        completedAt,
      } = req.body;

      console.log(
        "📥 Pre-assessment received"
      );

      console.log(
        "Clerk ID:",
        clerkId
      );

      // ======================================================
      // VALIDATE CLERK ID
      // ======================================================

      if (!clerkId) {
        res.status(400).json({
          success: false,
          message:
            "Clerk ID is required.",
        });

        return;
      }

      // ======================================================
      // FIND CURRENT USER PROFILE
      // ======================================================

      const profile =
        await UserProfile.findOne({
          clerkId,
        });

      if (!profile) {
        res.status(404).json({
          success: false,
          message:
            "User profile not found. Please complete the profile first.",
        });

        return;
      }

      console.log(
        "👤 User found:",
        profile.email
      );

      // ======================================================
      // CREATE ASSESSMENT RESULT
      // ======================================================

      const assessment =
        await AssessmentResult.create({
          // Current logged-in Clerk user
          clerkId: profile.clerkId,

          // User information
          userName: profile.name,

          email: profile.email,

          // Child information
          childName: profile.name,

          ageGroup: profile.age,

          support: profile.support,

          // Assessment information
          scores: scores || {},

          activities: activities || [],

          completedAt:
            completedAt || new Date(),
        });

      // ======================================================
      // SUCCESS
      // ======================================================

      console.log(
        "✅ Pre-assessment saved successfully"
      );

      console.log(
        "Assessment ID:",
        assessment._id
      );

      res.status(201).json({
        success: true,

        message:
          "Pre-assessment saved successfully.",

        assessment,
      });
    } catch (error) {
      console.error(
        "❌ Error saving pre-assessment:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to save pre-assessment.",
      });
    }
  }
);

// ============================================================
// GET ALL ASSESSMENTS OF A USER
// ============================================================
//
// GET
// /api/assessment/results/:clerkId
//
// ============================================================

router.get(
  "/results/:clerkId",
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { clerkId } = req.params;

      const assessments =
        await AssessmentResult.find({
          clerkId,
        }).sort({
          completedAt: -1,
        });

      res.status(200).json({
        success: true,

        count: assessments.length,

        assessments,
      });
    } catch (error) {
      console.error(
        "❌ Error fetching assessments:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to fetch assessment results.",
      });
    }
  }
);

// ============================================================
// GET LATEST ASSESSMENT OF A USER
// ============================================================
//
// GET
// /api/assessment/results/:clerkId/latest
//
// ============================================================

router.get(
  "/results/:clerkId/latest",
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { clerkId } = req.params;

      const assessment =
        await AssessmentResult.findOne({
          clerkId,
        }).sort({
          completedAt: -1,
        });

      if (!assessment) {
        res.status(404).json({
          success: false,

          message:
            "No assessment found.",
        });

        return;
      }

      res.status(200).json({
        success: true,

        assessment,
      });
    } catch (error) {
      console.error(
        "❌ Error fetching latest assessment:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to fetch latest assessment.",
      });
    }
  }
);

export default router;