require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const enquiryRouter = require("./routes/enquiry.route");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Request logging ───────────────────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ── Rate limiting – protect enquiry endpoint ──────────────────────────────────
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries from this IP. Please try again after 15 minutes.",
  },
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

app.use("/api/enquiry", enquiryLimiter, enquiryRouter);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error."
        : err.message,
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Powertech API running on http://localhost:${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`   Allowed origins : ${allowedOrigins.join(", ")}`);
});

module.exports = app;
