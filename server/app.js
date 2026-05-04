import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import miscellaneousRoutes from "./routes/miscellaneous.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= CORS (FINAL FIX) =================
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
      ];

      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".onrender.com")
      ) {
        return callback(null, true);
      }

      return callback(null, true);
    },
    credentials: true,
  })
);

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ================= HEALTH CHECK =================
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// ================= ROUTES =================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscellaneousRoutes);

// ================= FRONTEND (PRODUCTION) =================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// ================= ERROR HANDLER =================
app.use(errorMiddleware);

export default app;