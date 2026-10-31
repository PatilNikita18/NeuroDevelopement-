// import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   clerkUserId: string;
//   email: string;

//   authProvider: "email" | "google";
//   hasPassword: boolean;

//   child: {
//     name: string;
//     nickname: string;
//     avatar: string;
//     ageRange?: "5-8" | "9-12" | "13-18";
//     age?: number;
//     condition?: "ID" | "AUTISM" | "ADHD" | "DS";
//   };

//   preferences: (
//     | "pictures"
//     | "listening"
//     | "games"
//     | "reading"
//     | "puzzles"
//     | "animations"
//   )[];

//   sessionDuration: 5 | 10 | 15;

//   profileCompleted: boolean;

//   learningProgress: {
//     totalActivitiesCompleted: number;
//     totalSessionsCompleted: number;
//     totalPoints: number;
//     currentStreak: number;
//     longestStreak: number;
//     level: number;
//   };

//   lastLoginAt?: Date;
// }

// const userSchema = new Schema<IUser>(
//   {
//     clerkUserId: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//       trim: true,
//     },

//     authProvider: {
//       type: String,
//       enum: ["email", "google"],
//       default: "email",
//     },

//     // DO NOT STORE THE ACTUAL PASSWORD
//     hasPassword: {
//       type: Boolean,
//       default: false,
//     },

//     child: {
//       name: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       nickname: {
//         type: String,
//         default: "",
//         trim: true,
//       },
//       avatar: {
//         type: String,
//         default: "😊",
//       },
//       ageRange: {
//         type: String,
//         enum: ["5-8", "9-12", "13-18"],
//       },
//       age: {
//         type: Number,
//         min: 5,
//         max: 18,
//       },
//       condition: {
//         type: String,
//         enum: ["ID", "AUTISM", "ADHD", "DS"],
//       },
//     },

//     preferences: {
//       type: [
//         {
//           type: String,
//           enum: ["pictures", "listening", "games", "reading", "puzzles", "animations"],
//         },
//       ],
//       default: [],
//     },

//     sessionDuration: {
//       type: Number,
//       enum: [5, 10, 15],
//       default: 10,
//     },

//     profileCompleted: {
//       type: Boolean,
//       default: false,
//       index: true,
//     },

//     learningProgress: {
//       totalActivitiesCompleted: { type: Number, default: 0 },
//       totalSessionsCompleted: { type: Number, default: 0 },
//       totalPoints: { type: Number, default: 0 },
//       currentStreak: { type: Number, default: 0 },
//       longestStreak: { type: Number, default: 0 },
//       level: { type: Number, default: 1 },
//     },

//     lastLoginAt: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model<IUser>("User", userSchema);

// export default User;



// import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   age: number;
//   condition?: string;
//   learningLevel?: string;
// }

// const userSchema = new Schema<IUser>(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true
//     },

//     age: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 100
//     },

//     condition: {
//       type: String,
//       trim: true
//     },

//     learningLevel: {
//       type: String,
//       trim: true
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// const User = mongoose.model<IUser>("User", userSchema);

// export default User;


// import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   clerkId: string;
//   name: string;
//   email: string;
//   nickname?: string;
//   avatar?: string;
//   ageRange: string;
//   condition: string;
//   preferences: string[];
//   sessionDuration: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new Schema<IUser>(
//   {
//     clerkId: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },

//     name: {
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

//     nickname: {
//       type: String,
//       trim: true,
//     },

//     avatar: {
//       type: String,
//       default: "😊",
//     },

//     ageRange: {
//       type: String,
//       required: true,
//     },

//     condition: {
//       type: String,
//       required: true,
//     },

//     preferences: {
//       type: [String],
//       default: [],
//     },

//     sessionDuration: {
//       type: Number,
//       default: 10,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model<IUser>("User", userSchema);

// export default User;



// import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   clerkId: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new Schema<IUser>(
//   {
//     clerkId: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     firstName: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     lastName: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model<IUser>("User", userSchema);






// final code


// export default User;
// import mongoose, {
//   Document,
//   Schema,
// } from "mongoose";

// export interface IUser extends Document {
//   clerkId: string;
//   email: string;

//   childName: string;
//   nickname?: string;
//   avatar: string;

//   ageRange?: string;
//   condition?: string;

//   preferences: string[];
//   sessionDuration: number;

//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new Schema<IUser>(
//   {
//     // Clerk User ID
//     clerkId: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },

//     // Email
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     // Child's Name
//     childName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // Nickname - Optional
//     nickname: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     // Profile Avatar
//     avatar: {
//       type: String,
//       default: "😊",
//       trim: true,
//     },

//     // Age Range - Optional
//     ageRange: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     // Condition - Optional
//     condition: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     // Learning Preferences
//     preferences: {
//       type: [String],
//       default: [],
//     },

//     // Session Duration
//     sessionDuration: {
//       type: Number,
//       default: 10,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model<IUser>(
//   "User",
//   userSchema
// );

// export default User;



import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;

  childName: string;
  nickname?: string;
  avatar: string;

  ageRange?: string;
  condition?: string;

  preferences: string[];
  sessionDuration: number;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    // Clerk User ID
    clerkId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Child's Name
    childName: {
      type: String,
      required: true,
      trim: true,
    },

    // Nickname - Optional
    nickname: {
      type: String,
      default: "",
      trim: true,
    },

    // Profile Avatar
    avatar: {
      type: String,
      default: "😊",
      trim: true,
    },

    // Age Range - Optional
    ageRange: {
      type: String,
      default: "",
      trim: true,
    },

    // Condition - Optional
    condition: {
      type: String,
      default: "",
      trim: true,
    },

    // Learning Preferences
    preferences: {
      type: [String],
      default: [],
    },

    // Session Duration
    sessionDuration: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

// Third argument pins the physical collection name to "Enduser" — without
// it, Mongoose would auto-pluralize the "User" model name into "users"
// instead, which is the collection you were storing into before.
const User = mongoose.model<IUser>(
  "User",
  userSchema,
  "Enduser"
);

export default User;