const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Gig routes
app.use("/student", require("./routes/student"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
