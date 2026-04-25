const KEY = "ranking";

export function getRankingStorage() {
	const data = localStorage.getItem(KEY);
	return data ? JSON.parse(data) : [];
}

export function salvarRanking(nome, pontuacao) {
	const ranking = getRankingStorage();

	const existente = ranking.find((j) => j.nome === nome);

	if (existente) {
		if (pontuacao > existente.pontuacao) {
			existente.pontuacao = pontuacao;
		}
	} else {
		ranking.push({ nome, pontuacao });
	}

	ranking.sort((a, b) => b.pontuacao - a.pontuacao);

	const top5 = ranking.slice(0, 5);

	localStorage.setItem(KEY, JSON.stringify(top5));
}
