import { getRanking } from "../services/api";

export const nomeExiste = async (nome) => {
	const jogadores = await getRanking();
	return jogadores.some((j) => j.nome.toLowerCase() === nome.toLowerCase());
};
