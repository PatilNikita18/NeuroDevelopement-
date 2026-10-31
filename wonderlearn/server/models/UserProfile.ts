import mongoose, {
  Document,
  Schema,
} from "mongoose";

// ============================================================
// USER PROFILE INTERFACE
// ============================================================

export interface IUserProfile
  extends Document {
  clerkId: string;

  name: string;

  nickname?: string;

  email: string;

  avatar: string;

  age:
    | "5-8"
    | "9-12"
    | "13-18";

  support:
    | "ADHD"
    | "Intellectual Disability"
    | "Autism";

  preferences: string[];

  sessionLength: number;

  createdAt: Date;

  updatedAt: Date;
}

// ============================================================
// USER PROFILE SCHEMA
// ============================================================

const userProfileSchema =
  new Schema<IUserProfile>(
    {
      // ========================================================
      // CLERK ID
      // ========================================================

      clerkId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },

      // ========================================================
      // NAME
      // ========================================================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      // ========================================================
      // NICKNAME
      // ========================================================

      nickname: {
        type: String,
        default: "",
        trim: true,
      },

      // ========================================================
      // EMAIL
      // ========================================================

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      // ========================================================
      // AVATAR
      // ========================================================

      avatar: {
        type: String,
        required: true,
        default: "😊",
      },

      // ========================================================
      // AGE GROUP
      // ========================================================

      age: {
        type: String,
        required: true,
        enum: [
          "5-8",
          "9-12",
          "13-18",
        ],
      },

      // ========================================================
      // LEARNING SUPPORT
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
      // LEARNING PREFERENCES
      // ========================================================

      preferences: {
        type: [String],
        required: true,
        default: [],
      },

      // ========================================================
      // SESSION LENGTH
      // ========================================================

      sessionLength: {
        type: Number,
        required: true,
        enum: [5, 10, 20],
        default: 10,
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
// Third argument explicitly creates/uses the collection:
// "UserProfile"
//
// Therefore MongoDB will contain:
//
// wonderlearn
//     └── UserProfile
//
// ============================================================

const UserProfile =
  mongoose.model<IUserProfile>(
    "UserProfile",
    userProfileSchema,
    "UserProfile"
  );

export default UserProfile;