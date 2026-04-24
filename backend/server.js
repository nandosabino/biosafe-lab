import dotenv from "dotenv";

dotenv.config();

console.log("URI:", process.env.MONGO_URI);

import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import rankingRoutes from "./routes/ranking.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/scores", rankingRoutes);

app.listen(3000, () => {
	console.log("🚀 Servidor rodando na porta 3000");
});
