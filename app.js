const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Home redirects to sign in
app.get("/", (req, res) => {
  res.redirect("/signin");
});

// Auth routes
app.use("/", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
