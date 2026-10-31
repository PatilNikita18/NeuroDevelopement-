import mongoose, {
  Document,
  Schema,
} from "mongoose";

// ============================================================
// ASSESSMENT ACTIVITY
// ============================================================

export interface IAssessmentActivity {
  questionId: string;
  skill: string;
  selectedAnswer: string;

  correct: boolean;

  timeSpent: number;

  attempts: number;

  hintUsed: boolean;

  audioUsed: boolean;

  visualSupport: boolean;
}

// ============================================================
// ASSESSMENT RESULT
// ============================================================

export interface IAssessmentResult
  extends Document {
  clerkId: string;

  userName: string;

  email: string;

  childName: string;

  ageGroup:
    | "5-8"
    | "9-12"
    | "13-18";

  support:
    | "ADHD"
    | "Intellectual Disability"
    | "Autism";

  scores: {
    attention: number;
    memory: number;
    math: number;
    reading: number;
    problemSolving: number;
    communication: number;
  };

  activities: IAssessmentActivity[];

  completedAt: Date;

  createdAt: Date;

  updatedAt: Date;
}

// ============================================================
// ACTIVITY SCHEMA
// ============================================================

const assessmentActivitySchema =
  new Schema<IAssessmentActivity>(
    {
      questionId: {
        type: String,
        required: true,
        trim: true,
      },

      skill: {
        type: String,
        required: true,
        trim: true,
      },

      selectedAnswer: {
        type: String,
        default: "",
      },

      correct: {
        type: Boolean,
        required: true,
      },

      timeSpent: {
        type: Number,
        default: 0,
      },

      attempts: {
        type: Number,
        default: 1,
      },

      hintUsed: {
        type: Boolean,
        default: false,
      },

      audioUsed: {
        type: Boolean,
        default: false,
      },

      visualSupport: {
        type: Boolean,
        default: false,
      },
    },
    {
      _id: false,
    }
  );

// ============================================================
// ASSESSMENT RESULT SCHEMA
// ============================================================

const assessmentResultSchema =
  new Schema<IAssessmentResult>(
    {
      // ========================================================
      // CLERK USER ID
      // ========================================================

      clerkId: {
        type: String,
        required: true,
        index: true,
        trim: true,
      },

      // ========================================================
      // USER NAME
      // ========================================================

      userName: {
        type: String,
        required: true,
        trim: true,
      },

      // ========================================================
      // USER EMAIL
      // ========================================================

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      // ========================================================
      // CHILD NAME
      // ========================================================

      childName: {
        type: String,
        required: true,
        trim: true,
      },

      // ========================================================
      // AGE GROUP
      // ========================================================

      ageGroup: {
        type: String,
        required: true,
        enum: [
          "5-8",
          "9-12",
          "13-18",
        ],
      },

      // ========================================================
      // SUPPORT TYPE
      // ========================================================

      support: {
        type: String,
        required: true,
        enum: [
          "ADHD",
          "Intellectual Disability",
          "Autism",
        ],
      },

      // ========================================================
      // SKILL SCORES
      // ========================================================

      scores: {
        attention: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        memory: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        math: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        reading: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        problemSolving: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        communication: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
      },

      // ========================================================
      // QUESTION-BY-QUESTION RESULTS
      // ========================================================

      activities: {
        type: [assessmentActivitySchema],
        default: [],
      },

      // ========================================================
      // COMPLETION DATE
      // ========================================================

      completedAt: {
        type: Date,
        default: Date.now,
      },
    },

    {
      timestamps: true,
    }
  );

// ============================================================
// MODEL
// ============================================================
//
// Database:
// wonderlearn
//
// Collection:
// AssessmentResult
//
// ============================================================

const AssessmentResult =
  mongoose.model<IAssessmentResult>(
    "AssessmentResult",
    assessmentResultSchema,
    "AssessmentResult"
  );

export default AssessmentResult;





// import mongoose, { Schema, model, models } from "mongoose";

// const assessmentResultSchema = new Schema(
//   {
//     clerkId: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     userName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//       trim: true,
//     },

//     childName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     ageGroup: {
//       type: String,
//       required: true,
//       enum: ["5-8", "9-12", "13-18"],
//     },

//     support: {
//       type: String,
//       required: true,
//       enum: [
//         "ADHD",
//         "Intellectual Disability",
//         "Autism",
//       ],
//     },

//     scores: {
//       type: Schema.Types.Mixed,
//       required: true,
//     },

//     activities: {
//       type: [Schema.Types.Mixed],
//       default: [],
//     },

//     completedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//     collection: "AssessmentResult",
//   }
// );

// assessmentResultSchema.index({ clerkId: 1, completedAt: -1 });

// const AssessmentResult =
//   models.AssessmentResult ||
//   model("AssessmentResult", assessmentResultSchema);

// export default AssessmentResult;
