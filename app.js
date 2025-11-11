// app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const client = require("prom-client");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [/^https:\/\/.*\.netlify\.app$/, "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Prometheus setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});
register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

// Routes
app.get("/", (req, res) => res.send("API is working."));

app.use("/api/auth", authRoutes);

// Export app for testing
module.exports = app;

