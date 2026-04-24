import express from "express";
import Jogador from "../models/jogador.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const { nome, pontuacao } = req.body;

		const nomeFormatado = nome.trim().toLowerCase();

		if (!nome || pontuacao == null) {
			return res.status(400).json({ erro: "Dados inválidos" });
		}

		let jogador = await Jogador.findOne({ nome: nomeFormatado });

		if (jogador) {
			if (pontuacao > jogador.pontuacao) {
				jogador.pontuacao = pontuacao;
				await jogador.save();
			}
		} else {
			jogador = new Jogador({ nome: nomeFormatado, pontuacao });
			await jogador.save();
		}

		res.json(jogador);
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const ranking = await Jogador.find().sort({ pontuacao: -1 });
		res.json(ranking);
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
});

export default router;
