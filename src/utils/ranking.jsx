export function getRanking(pontuacao, total) {
  if (pontuacao === total * 10) {
    return {
      titulo: "Mestre da Biossegurança 🏆",
      cor: "text-yellow-400",
      bg: "from-yellow-400 to-orange-500",
      emoji: "👑",
    };
  }

  if (pontuacao >= 20) {
    return {
      titulo: "Quase Perfeito 🥇",
      cor: "text-green-400",
      bg: "from-green-400 to-emerald-500",
      emoji: "🔥",
    };
  }

  if (pontuacao >= 10) {
    return {
      titulo: "Em Evolução 🥈",
      cor: "text-blue-400",
      bg: "from-blue-400 to-cyan-500",
      emoji: "⚡",
    };
  }

  return {
    titulo: "Precisa Melhorar 🥉",
    cor: "text-red-400",
    bg: "from-red-500 to-pink-500",
    emoji: "💀",
  };
}
