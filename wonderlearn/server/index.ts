// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import { clerkMiddleware } from "@clerk/express";

// // import connectDB from "./config/db.js";
// // import userRoutes from "./routes/userRoutes.js";

// // dotenv.config();

// // const app = express();

// // const PORT = process.env.PORT || 5000;

// // // DATABASE
// // connectDB();

// // // MIDDLEWARE
// // app.use(
// //   cors({
// //     origin: process.env.FRONTEND_URL || "http://localhost:5173",
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Clerk middleware
// // app.use(clerkMiddleware());

// // // HEALTH CHECK
// // app.get("/", (_req, res) => {
// //   res.json({
// //     success: true,
// //     message: "WonderLearn API is running 🚀",
// //   });
// // });

// // // USER ROUTES
// // app.use("/api/users", userRoutes);

// // // ERROR HANDLER
// // app.use(
// //   (
// //     err: any,
// //     _req: express.Request,
// //     res: express.Response,
// //     _next: express.NextFunction
// //   ) => {
// //     console.error(err);

// //     res.status(500).json({
// //       success: false,
// //       message: "Internal server error.",
// //     });
// //   }
// // );

// // // START SERVER
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });




// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import connectDB from "./config/db.js";
// // import userRoutes from "./routes/userRoutes.js";
// // import { notFound } from "./middleware/errorMiddleware.js";

// // // Load environment variables
// // dotenv.config();

// // // Create Express application
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect MongoDB
// // connectDB();

// // // Test route
// // app.get("/", (req, res) => {
// //   res.json({
// //     success: true,
// //     message: "WonderLearn server is running"
// //   });
// // });

// // // User routes
// // app.use("/api/users", userRoutes);

// // // 404 middleware
// // app.use(notFound);

// // // Port
// // const PORT = Number(process.env.PORT) || 5000;

// // // Start server
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running at http://localhost:${PORT}`);
// // });



// //this is final and working


// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import connectDB from "./config/db.js";
// // import userRoutes from "./routes/userRoutes.js";

// // // Load environment variables
// // dotenv.config();

// // const app = express();

// // const PORT = process.env.PORT || 5000;
// // const FRONTEND_URL =
// //   process.env.FRONTEND_URL || "http://localhost:5173";

// // // Connect MongoDB
// // connectDB();

// // // Middleware
// // app.use(
// //   cors({
// //     origin: FRONTEND_URL,
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());

// // // Test route
// // app.get("/", (_req, res) => {
// //   res.json({
// //     success: true,
// //     message: "WonderLearn backend is running",
// //   });
// // });

// // // Health check
// // app.get("/api/health", (_req, res) => {
// //   res.json({
// //     success: true,
// //     message: "API is working",
// //   });
// // });

// // // User routes
// // app.use("/api/users", userRoutes);

// // // Start server
// // app.listen(PORT, () => {
// //   console.log("-----------------------------------");
// //   console.log("WonderLearn Backend Started");
// //   console.log(`Server: http://localhost:${PORT}`);
// //   console.log(`Frontend: ${FRONTEND_URL}`);
// //   console.log("-----------------------------------");
// // });


// //this is final working correct code

// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import connectDB from "./config/db.js";
// // import userRoutes from "./routes/userRoutes.js";

// // dotenv.config();

// // const app = express();

// // const PORT = process.env.PORT || 5000;
// // const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// // app.use(
// //   cors({
// //     origin: FRONTEND_URL,
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());

// // // Logs every request that reaches this server, so you can tell from the
// // // terminal whether the frontend's save call is arriving at all — vs.
// // // failing before it ever leaves the browser (CORS, wrong VITE_API_URL).
// // app.use((req, _res, next) => {
// //   console.log(`📡 ${req.method} ${req.originalUrl}`);
// //   next();
// // });

// // app.get("/", (_req, res) => {
// //   res.json({
// //     success: true,
// //     message: "WonderLearn backend is running",
// //   });
// // });

// // app.get("/api/health", (_req, res) => {
// //   res.json({
// //     success: true,
// //     message: "API is working",
// //   });
// // });

// // app.use("/api/users", userRoutes);

// // // Start the server only after MongoDB is actually connected. Previously
// // // connectDB() ran without being awaited, so the server could start
// // // accepting requests before the database connection was ready.
// // async function start() {
// //   await connectDB();

// //   app.listen(PORT, () => {
// //     console.log("-----------------------------------");
// //     console.log("WonderLearn Backend Started");
// //     console.log(`Server: http://localhost:${PORT}`);
// //     console.log(`Frontend: ${FRONTEND_URL}`);
// //     console.log("-----------------------------------");
// //   });
// // }

// // start();


// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import connectDB from "./config/db.js";
// // import userRoutes from "./routes/userRoutes.js";
// // import { notFound } from "./middleware/errorMiddleware.js";

// // dotenv.config();

// // const app = express();

// // const PORT = process.env.PORT || 5000;
// // const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// // app.use(cors({ origin: FRONTEND_URL, credentials: true }));
// // app.use(express.json());

// // app.use((req, _res, next) => {
// //   console.log(`📡 ${req.method} ${req.originalUrl}`);
// //   next();
// // });

// // app.get("/", (_req, res) => {
// //   res.json({ success: true, message: "WonderLearn backend is running" });
// // });

// // app.get("/api/health", (_req, res) => {
// //   res.json({ success: true, message: "API is working" });
// // });

// // app.use("/api/users", userRoutes);

// // app.use(notFound);

// // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// //   console.error("Unhandled error:", err);
// //   res.status(500).json({ success: false, message: "Internal server error." });
// // });

// // async function start() {
// //   // Server only starts accepting requests once Mongo is actually
// //   // connected — connectDB() now exits the process on failure instead of
// //   // continuing silently.
// //   await connectDB();

// //   app.listen(PORT, () => {
// //     console.log("-----------------------------------");
// //     console.log("WonderLearn Backend Started");
// //     console.log(`Server: http://localhost:${PORT}`);
// //     console.log(`Frontend: ${FRONTEND_URL}`);
// //     console.log("-----------------------------------");
// //   });
// // }

// // start();



// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import connectDB from "./config/db.js";
// // import userRoutes from "./routes/userRoutes.js";
// // import { notFound } from "./middleware/errorMiddleware.js";

// // dotenv.config();

// // const app = express();

// // const PORT = process.env.PORT || 5000;
// // const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// // app.use(cors({ origin: FRONTEND_URL, credentials: true }));
// // app.use(express.json());

// // app.use((req, _res, next) => {
// //   console.log(`📡 ${req.method} ${req.originalUrl}`);
// //   next();
// // });

// // app.get("/", (_req, res) => {
// //   res.json({ success: true, message: "WonderLearn backend is running" });
// // });

// // app.get("/api/health", (_req, res) => {
// //   res.json({ success: true, message: "API is working" });
// // });

// // app.use("/api/users", userRoutes);

// // app.use(notFound);

// // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// //   console.error("Unhandled error:", err);
// //   res.status(500).json({ success: false, message: "Internal server error." });
// // });

// // async function start() {
// //   await connectDB();

// //   app.listen(PORT, () => {
// //     console.log("-----------------------------------");
// //     console.log("WonderLearn Backend Started");
// //     console.log(`Server: http://localhost:${PORT}`);
// //     console.log(`Frontend: ${FRONTEND_URL}`);
// //     console.log("-----------------------------------");
// //   });
// // }

// // start();


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";

// import userRoutes from "./routes/userRoutes.js";

// import assessmentRoutes from "./routes/assessmentRoutes.js";

// import { notFound } from "./middleware/errorMiddleware.js";

// dotenv.config();

// const app = express();

// const PORT =
//   process.env.PORT || 5000;

// const FRONTEND_URL =
//   process.env.FRONTEND_URL ||
//   "http://localhost:5173";

// // ============================================================
// // MIDDLEWARE
// // ============================================================

// app.use(
//   cors({
//     origin: FRONTEND_URL,
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ============================================================
// // REQUEST LOGGER
// // ============================================================

// app.use(
//   (
//     req,
//     _res,
//     next
//   ) => {
//     console.log(
//       `📡 ${req.method} ${req.originalUrl}`
//     );

//     next();
//   }
// );

// // ============================================================
// // HOME
// // ============================================================

// app.get(
//   "/",
//   (_req, res) => {
//     res.json({
//       success: true,
//       message:
//         "WonderLearn backend is running",
//     });
//   }
// );

// // ============================================================
// // HEALTH CHECK
// // ============================================================

// app.get(
//   "/api/health",
//   (_req, res) => {
//     res.json({
//       success: true,
//       message:
//         "API is working",
//     });
//   }
// );

// // ============================================================
// // USER ROUTES
// // ============================================================

// app.use(
//   "/api/users",
//   userRoutes
// );

// // ============================================================
// // ASSESSMENT ROUTES
// // ============================================================

// app.use(
//   "/api/assessment",
//   assessmentRoutes
// );

// // ============================================================
// // NOT FOUND
// // ============================================================

// app.use(notFound);

// // ============================================================
// // ERROR HANDLER
// // ============================================================

// app.use(
//   (
//     err: any,
//     _req: express.Request,
//     res: express.Response,
//     _next: express.NextFunction
//   ) => {
//     console.error(
//       "Unhandled error:",
//       err
//     );

//     res.status(500).json({
//       success: false,
//       message:
//         "Internal server error.",
//     });
//   }
// );

// // ============================================================
// // START SERVER
// // ============================================================

// async function start() {
//   await connectDB();

//   app.listen(
//     PORT,
//     () => {
//       console.log(
//         "-----------------------------------"
//       );

//       console.log(
//         "WonderLearn Backend Started"
//       );

//       console.log(
//         `Server: http://localhost:${PORT}`
//       );

//       console.log(
//         `Frontend: ${FRONTEND_URL}`
//       );

//       console.log(
//         "-----------------------------------"
//       );
//     }
//   );
// }

// start();



import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js"; // ✅ NEW

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// DATABASE
connectDB();

// MIDDLEWARE
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk middleware
app.use(clerkMiddleware());

// HEALTH CHECK
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "WonderLearn API is running 🚀",
  });
});

// USER ROUTES
app.use("/api/users", userRoutes);

// ASSESSMENT ROUTES  ✅ NEW
// POST /api/assessment/results
// GET  /api/assessment/results/:clerkId
// GET  /api/assessment/results/:clerkId/latest
app.use("/api/assessment", assessmentRoutes);

// ERROR HANDLER
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});