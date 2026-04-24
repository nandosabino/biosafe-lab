import mongoose from "mongoose";

const jogadorSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	pontuacao: { type: Number, required: true },
	data: { type: Date, default: Date.now },
});

export default mongoose.model("Jogador", jogadorSchema);
