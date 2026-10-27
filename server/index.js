import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chatHandler from "../api/chat.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(currentDirectory, "../dist");

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  res.json({
    status: "ok",
    keyConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
    modelConfigured: Boolean(process.env.GEMINI_MODEL?.trim()),
  });
});

app.all("/api/chat", async (req, res, next) => {
  try {
    await chatHandler(req, res);
  } catch (error) {
    next(error);
  }
});

// Unknown API routes should return JSON, not the React page.
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found.",
  });
});

// Serve only the built website—not source files or environment files.
app.use(express.static(distDirectory));

// Serve the React entry page for browser navigation.
app.get("/{*splat}", (req, res, next) => {
  res.sendFile(path.join(distDirectory, "index.html"), (error) => {
    if (error) next(error);
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({
      error: "Your message is too large. Please shorten it.",
    });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Invalid request format.",
    });
  }

  res.status(500).json({
    error: "Something went wrong. Please try again later.",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});