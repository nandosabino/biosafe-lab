const API_URL = import.meta.env.VITE_API_URL;

export async function salvarRankingAPI(nome, pontuacao) {
	await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ nome, pontuacao }),
	});
}

export async function getRanking() {
	const res = await fetch(API_URL);
	return res.json();
}
