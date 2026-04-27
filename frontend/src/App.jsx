import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Fim from "./pages/Fim";
import Inicio from "./pages/Inicio";
import Jogo from "./pages/Jogo";
import Ranking from "./pages/Ranking";
import { salvarRankingAPI } from "./services/api";

export default function App() {
  const [tela, setTela] = useState("inicio");
  const [pontuacao, setPontuacao] = useState(0);
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");

  async function finalizar(pontos) {
    const nome = localStorage.getItem("usuario");

    await salvarRankingAPI(nome, pontos);

    setPontuacao(pontos);
    setTela("fim");
  }

  const variants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  return (
    <div className="min-h-screen w-full overflow-hidden text-white relative">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/lab-bg.jpg')" }}
      />

      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-black/60 to-cyan-900/30" />

      <div className="relative z-10 min-h-screen w-full">
        <AnimatePresence mode="wait">
          {tela === "inicio" && (
            <motion.div
              key="inicio"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Inicio
                iniciar={(nome) => {
                  setUsuario(nome);
                  setTela("jogo");
                }}
                verRanking={() => setTela("ranking")}
              />
            </motion.div>
          )}

          {tela === "jogo" && (
            <Jogo
              usuario={usuario}
              finalizar={(pontos) => {
                setPontuacao(pontos);
                setTela("fim");

                salvarRankingAPI(usuario, pontos).catch(() => {});
              }}
            />
          )}

          {tela === "fim" && (
            <motion.div
              key="fim"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Fim
                pontuacao={pontuacao}
                reiniciar={() => {
                  localStorage.removeItem("usuario");
                  setUsuario("");
                  setTela("inicio");
                }}
              />
            </motion.div>
          )}

          {tela === "ranking" && <Ranking voltar={() => setTela("inicio")} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
