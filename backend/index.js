import dotenv from "dotenv";
dotenv.config(); // Load environment variablesimport express from "express";
import express from "express";  // ✅ Now properly imported
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";

const PORT = process.env.PORT || 5001; // Default to 5001 if env variable is missing

const __dirname = path.resolve();

console.log("PORT from .env:", process.env.PORT);
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
