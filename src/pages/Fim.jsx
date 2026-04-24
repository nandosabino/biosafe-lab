import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { perguntas } from "../data/perguntas";
import { getRanking } from "../services/api";
import { getRanking as getRankingVisual } from "../utils/ranking";

export default function Fim({ pontuacao, reiniciar }) {
  const ranking = getRankingVisual(pontuacao, perguntas.length);

  const [rankingLista, setRankingLista] = useState([]);

  useEffect(() => {
    async function carregarRanking() {
      const data = await getRanking();
      setRankingLista(data);
    }

    carregarRanking();
  }, []);

  const usuarioAtual = localStorage.getItem("usuario");

  const posicao = rankingLista.findIndex((j) => j.nome === usuarioAtual) + 1;

  const pontuacaoMaxima = perguntas.length * 10;
  const foiPerfeito = pontuacao === pontuacaoMaxima;

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/lab-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black/50 to-cyan-900/30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(0,255,255,0.15)] rounded-3xl px-10 py-12 flex flex-col items-center gap-6 max-w-sm w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Resultado Final
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
          className={`px-6 py-4 rounded-2xl bg-gradient-to-r ${ranking.bg} shadow-xl shadow-orange-500/30`}
        >
          <p className="text-2xl">{ranking.emoji}</p>
          <p className="font-semibold text-black">{ranking.titulo}</p>
        </motion.div>

        <p className="text-lg text-gray-300">
          Pontuação:{" "}
          <span className="text-cyan-400 font-bold ml-2 text-xl">
            {pontuacao}
          </span>
        </p>

        <p className="text-sm">
          {posicao > 0 ? (
            <span className="text-cyan-400 font-semibold">
              Você ficou em {posicao}º lugar 🏆
            </span>
          ) : (
            <span className="text-gray-400">Você não entrou no ranking</span>
          )}
        </p>

        {posicao === 1 && (
          <p className="text-yellow-400 text-sm">🥇 Você é o líder!</p>
        )}

        <div className="w-full mt-4 text-left">
          <h2 className="text-sm text-gray-400 mb-2">🏆 Ranking</h2>

          <div className="flex flex-col gap-2">
            {rankingLista.map((jogador, index) => (
              <div
                key={index}
                className={`flex justify-between px-3 py-2 rounded-lg text-sm transition-all ${jogador.nome === usuarioAtual ? "bg-cyan-500/20 border border-cyan-400 shadow-md shadow-cyan-400/20" : "bg-white/5"}`}
              >
                <span className="text-gray-300">
                  {index + 1}. {jogador.nome}
                </span>

                <span className="text-cyan-400 font-semibold">
                  {jogador.pontuacao}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={reiniciar}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          Jogar Novamente
        </motion.button>

        {foiPerfeito && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-yellow-400 text-sm mt-2"
          >
            🏆 Pontuação máxima!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
