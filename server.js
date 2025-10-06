import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoute.js";
import { swaggerUi, specs } from "./config/swagger.js";
import client from "prom-client"; // ✅ Prometheus client

const app = express();
const port = process.env.PORT || 4000;

// ==================== Middleware ====================
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [/^https:\/\/.*\.netlify\.app$/, "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ==================== Database Connection ====================
connectDB();

// ==================== Prometheus & Grafana Monitoring ====================

// Create a Registry to register the metrics
const register = new client.Registry();

// Collect default system metrics (CPU, memory, event loop lag, etc.)
client.collectDefaultMetrics({ register });

// Custom metric: count total HTTP requests
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});
register.registerMetric(httpRequestCounter);

// Middleware to track each request
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

// Expose metrics at /metrics for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// ==================== API Endpoints ====================

// Root route
app.get("/", (req, res) => {
  res.send("API is working.");
});

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 50px 0 }
      .swagger-ui .info .title { color: #2c3e50; font-size: 36px; }
      .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
      .swagger-ui .scheme-container { 
        background: #f8f9fa; 
        border: 1px solid #e9ecef; 
        border-radius: 4px; 
        padding: 10px; 
        margin: 20px 0; 
      }
      .swagger-ui .opblock.opblock-post { border-color: #28a745; }
      .swagger-ui .opblock.opblock-get { border-color: #007bff; }
      .swagger-ui .opblock-summary { font-weight: 600; }
    `,
    customSiteTitle: "MERN Auth API Documentation",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      docExpansion: "list",
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
    },
  })
);

// Authentication Routes
app.use("/api/auth", authRoutes);

// ==================== Start Server ====================
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
