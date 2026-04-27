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

  return (
    <AnimatePresence mode="wait">
      {tela === "inicio" && (
        <motion.div
          key="inicio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
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
          finalizar={async (pontos) => {
            setPontuacao(pontos);
            await salvarRankingAPI(usuario, pontos);

            setTela("fim");
          }}
        />
      )}

      {tela === "fim" && (
        <Fim
          pontuacao={pontuacao}
          reiniciar={() => {
            localStorage.removeItem("usuario");
            setUsuario("");
            setTela("inicio");
          }}
        />
      )}

      {tela === "ranking" && <Ranking voltar={() => setTela("inicio")} />}
    </AnimatePresence>
  );
}
