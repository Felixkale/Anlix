import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;
const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "anlix-web-service" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Anlix web service running on port ${PORT}`);
});
