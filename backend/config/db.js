import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
	try {
		console.log("DB URI:", process.env.MONGO_URI); // teste

		await mongoose.connect(process.env.MONGO_URI);

		console.log("🔥 MongoDB conectado");
	} catch (err) {
		console.error("❌ Erro Mongo:", err);
		process.exit(1);
	}
};
