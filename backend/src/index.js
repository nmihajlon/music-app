import express from "express";
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import path from "path";
import cors from 'cors';

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js"
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const __dirname = path.resolve(); //current folder - backend
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware()); // This will add auth to req obj => req.auth.userId
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
        fileSize: 10*1024*1024, //10MB
    }
}));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.log(err.message);
    return res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error": err.message});
});

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
    connectDB();
});