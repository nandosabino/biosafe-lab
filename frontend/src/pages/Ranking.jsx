import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRanking } from "../services/api";

export default function Ranking({ voltar }) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getRanking();
        setRanking(data);
      } catch (err) {
        console.error("Erro ao buscar ranking:", err);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  const renderItem = (jogador, index) => {
    const isTop1 = index === 0;
    const isTop2 = index === 1;
    const isTop3 = index === 2;

    let estilo = "bg-white/5 border-white/10";
    let emoji = `${index + 1}.`;

    if (isTop1) {
      estilo =
        "bg-yellow-400/20 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.25)]";
      emoji = "🥇";
    } else if (isTop2) {
      estilo = "bg-gray-300/20 border-gray-300";
      emoji = "🥈";
    } else if (isTop3) {
      estilo = "bg-orange-400/20 border-orange-400";
      emoji = "🥉";
    }

    return (
      <motion.div
        key={jogador._id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`flex justify-between items-center px-4 py-2 rounded-xl border ${estilo}`}
      >
        <span className="flex items-center gap-2">
          {emoji} {jogador.nome}
        </span>

        <span className="text-cyan-400 font-semibold">{jogador.pontuacao}</span>
      </motion.div>
    );
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/lab-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black/60 to-cyan-900/30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-sm h-[85vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(0,255,255,0.1)] px-6 py-6 flex flex-col"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">🏆 Ranking</h1>
          <p className="text-xs text-gray-400 mt-1">
            Resultado dos simuladores
          </p>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 min-h-0">
          {loading && (
            <p className="text-center text-sm text-gray-400">
              Carregando ranking...
            </p>
          )}

          {!loading && ranking.length === 0 && (
            <p className="text-center text-sm text-gray-400">
              Nenhum jogador ainda
            </p>
          )}

          {ranking.map(renderItem)}
        </div>

        <button
          onClick={voltar}
          className="mt-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Voltar ao Início
        </button>
      </motion.div>
    </div>
  );
}
