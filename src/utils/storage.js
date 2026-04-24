export const getJogadores = () => {
	return JSON.parse(localStorage.getItem("jogadores")) || [];
};

export const nomeExiste = (nome) => {
	const jogadores = getJogadores();
	return jogadores.some((j) => j.toLowerCase() === nome.toLowerCase());
};

export const salvarJogador = (nome) => {
	const jogadores = getJogadores();
	jogadores.push(nome);
	localStorage.setItem("jogadores", JSON.stringify(jogadores));
};
