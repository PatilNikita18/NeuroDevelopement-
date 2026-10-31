// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   try {
//     const mongoURI = process.env.MONGODB_URI;

//     if (!mongoURI) {
//       throw new Error("MONGODB_URI is not defined in .env");
//     }

//     const connection = await mongoose.connect(mongoURI);

//     console.log(`MongoDB connected: ${connection.connection.host}`);
//     console.log(`Database: ${connection.connection.name}`);
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   try {
//     const mongoURI = process.env.MONGODB_URI;

//     if (!mongoURI) {
//       throw new Error("MONGODB_URI is not defined in .env file");
//     }

//     await mongoose.connect(mongoURI);

//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed");

//     if (error instanceof Error) {
//       console.error(error.message);
//     } else {
//       console.error(error);
//     }

//     process.exit(1);
//   }
// };




// correct code 
// export default connectDB;
// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   try {
//     const mongoURI = process.env.MONGODB_URI;

//     if (!mongoURI) {
//       throw new Error(
//         "MONGODB_URI is not defined in .env"
//       );
//     }

//     const connection = await mongoose.connect(
//       mongoURI
//     );

//     console.log("-----------------------------------");
//     console.log("MongoDB Connected Successfully");
//     console.log(
//       `MongoDB Host: ${connection.connection.host}`
//     );
//     console.log("-----------------------------------");
//   } catch (error) {
//     console.error("-----------------------------------");
//     console.error("MongoDB Connection Error:");
//     console.error(error);
//     console.error("-----------------------------------");

//     process.exit(1);
//   }
// };

// export default connectDB;





//trial code
// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   const mongoURI = process.env.MONGODB_URI;

//   if (!mongoURI) {
//     console.error("❌ MONGODB_URI is not defined in .env");
//     process.exit(1);
//   }

//   // Listeners fire regardless of how the connection is established below,
//   // so if the connection drops later (not just on startup) you'll see it.
//   mongoose.connection.on("connected", () => {
//     console.log("-----------------------------------");
//     console.log("✅ MongoDB Connected");
//     console.log(`Host: ${mongoose.connection.host}`);
//     console.log(`Database: ${mongoose.connection.name}`);
//     console.log(`ReadyState: ${mongoose.connection.readyState} (1 = connected)`);
//     console.log("-----------------------------------");
//   });

//   mongoose.connection.on("error", (err) => {
//     console.error("❌ MongoDB connection error (post-connect):", err);
//   });

//   mongoose.connection.on("disconnected", () => {
//     console.warn("⚠️ MongoDB disconnected");
//   });

//   try {
//     // serverSelectionTimeoutMS makes a bad IP-allowlist / bad credentials
//     // fail fast and loudly (10s) instead of hanging silently for minutes.
//     await mongoose.connect(mongoURI, {
//       serverSelectionTimeoutMS: 10000,
//     });
//   } catch (error) {
//     console.error("-----------------------------------");
//     console.error("❌ MongoDB Connection FAILED at startup");
//     console.error(error);
//     console.error("-----------------------------------");
//     console.error(
//       "Most likely cause: your current IP isn't whitelisted in Atlas → " +
//       "Network Access, or the username/password in MONGODB_URI is wrong."
//     );
//     process.exit(1);
//   }
// };

// export default connectDB;




import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error(
      "❌ MONGODB_URI is not defined in .env"
    );

    process.exit(1);
  }

  // ============================================================
  // MONGODB CONNECTION EVENTS
  // ============================================================

  mongoose.connection.on("connected", () => {
    console.log("-----------------------------------");
    console.log("✅ MongoDB Connected");
    console.log(
      `Host: ${mongoose.connection.host}`
    );
    console.log(
      `Database: ${mongoose.connection.name}`
    );
    console.log(
      `ReadyState: ${mongoose.connection.readyState} (1 = connected)`
    );
    console.log("-----------------------------------");
  });

  mongoose.connection.on(
    "error",
    (err) => {
      console.error(
        "❌ MongoDB connection error:",
        err
      );
    }
  );

  mongoose.connection.on(
    "disconnected",
    () => {
      console.warn(
        "⚠️ MongoDB disconnected"
      );
    }
  );

  // ============================================================
  // CONNECT
  // ============================================================

  try {
    await mongoose.connect(
      mongoURI,
      {
        serverSelectionTimeoutMS: 10000,
      }
    );
  } catch (error) {
    console.error("-----------------------------------");
    console.error(
      "❌ MongoDB Connection FAILED"
    );
    console.error(error);
    console.error("-----------------------------------");

    console.error(
      "Check MongoDB Atlas Network Access and database credentials."
    );

    process.exit(1);
  }
};

export default connectDB;