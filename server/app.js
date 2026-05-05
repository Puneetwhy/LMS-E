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

// ================= CORS =================
const corsOptions = {
  origin: "https://lms-e-j7ct.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ================= MIDDLEWARE =================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// ================= HEALTH CHECK =================
app.get("/ping", (_req, res) => res.status(200).json({ status: "ok" }));

// ================= ROUTES =================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscellaneousRoutes);

// ================= PRODUCTION =================
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientPath));

  app.get("/*", (_req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// ================= ERROR HANDLER (Last) =================
app.use(errorMiddleware);

export default app;
