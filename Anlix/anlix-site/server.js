const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;
const ROOT_DIR = __dirname;

// Serve static assets from the current folder
app.use(express.static(ROOT_DIR, {
  extensions: ["html"]
}));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "index.html"));
});

// Dashboard route
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "dashboard.html"));
});

// Optional direct html routes
app.get("/index.html", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "index.html"));
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "dashboard.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "anlix-web-service"
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(ROOT_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Anlix web service running on port ${PORT}`);
});
