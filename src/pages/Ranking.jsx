import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRanking } from "../services/api";

export default function Ranking({ voltar }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    async function carregar() {
      const data = await getRanking();
      setRanking(data);
    }

    carregar();
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/lab-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black/50 to-cyan-900/30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(0,255,255,0.1)] rounded-3xl px-8 py-10 flex flex-col gap-6 max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold text-center">🏆 Ranking</h1>

        <div className="flex flex-col gap-2">
          {ranking.length === 0 && (
            <p className="text-gray-400 text-center text-sm">
              Nenhum jogador ainda
            </p>
          )}

          {ranking.map((jogador, index) => {
            const destaque =
              index === 0
                ? "bg-yellow-400/20 border-yellow-400"
                : index === 1
                  ? "bg-gray-300/20 border-gray-300"
                  : index === 2
                    ? "bg-orange-400/20 border-orange-400"
                    : "bg-white/5 border-white/10";

            return (
              <motion.div
                key={jogador._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <div
                  className={`flex justify-between items-center px-4 py-2 rounded-xl border ${destaque}`}
                >
                  <span className="flex items-center gap-2">
                    {index === 0 && "🥇 "}
                    {index === 1 && "🥈 "}
                    {index === 2 && "🥉 "}
                    {index > 2 && `${index + 1}.`}
                    {jogador.nome}
                  </span>

                  <span className="text-cyan-400 font-semibold">
                    {jogador.pontuacao}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={voltar}
          className="mt-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-semibold"
        >
          Voltar
        </button>
      </motion.div>
    </div>
  );
}
