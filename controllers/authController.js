const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../users.json");

exports.renderLandingPage = (req, res) => {
  res.render("index");
};

exports.renderSignIn = (req, res) => {
  res.render("signin");
};

exports.renderSignUp = (req, res) => {
  res.render("signup");
};

exports.signUp = (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.render("signup", { error: "All fields are required." });
  }
  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }
  if (users.find(u => u.email === email)) {
    return res.render("signup", { error: "Email already registered." });
  }
  users.push({ name, email, phone, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.render("signin", { message: "Registration successful. Please sign in." });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.send(`<h2>Welcome, ${user.name}! You have successfully signed in.</h2>`);
  } else {
    res.render("signin", { error: "Invalid email or password." });
  }
};
