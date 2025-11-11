// server.js
require("dotenv").config();
const connectDB = require("./config/mongodb");
const app = require("./app");

const port = process.env.PORT || 4000;

// Connect to DB
connectDB();

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});