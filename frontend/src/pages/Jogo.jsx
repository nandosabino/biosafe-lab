import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { perguntas } from "../data/perguntas";
import { embaralhar } from "../utils/embaralhar";

function embaralharPergunta(p) {
  const opcoesComIndex = p.opcoes.map((opcao, index) => ({
    text: opcao,
    originalIndex: index,
  }));

  const embaralhadas = embaralhar(opcoesComIndex);

  const novaCorreta = embaralhadas.findIndex(
    (op) => op.originalIndex === p.correta,
  );

  return {
    ...p,
    opcoes: embaralhadas.map((op) => op.text),
    correta: novaCorreta,
  };
}

export default function Jogo({ finalizar }) {
  const [perguntasJogo, setPerguntasJogo] = useState([]);
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [saindo, setSaindo] = useState(false);

  const TEMPO_MAX = 20;
  const [tempo, setTempo] = useState(TEMPO_MAX);

  const somAcerto = useRef(null);

  useEffect(() => {
    const perguntasAleatorias = embaralhar(perguntas).map(embaralharPergunta);

    setPerguntasJogo(perguntasAleatorias);
  }, []);

  useEffect(() => {
    const audio = new Audio("/sound-effect1.mp3");
    somAcerto.current = audio;
  }, []);

  useEffect(() => {
    if (mostrarResposta || respondido || saindo) return;

    if (tempo <= 0) {
      setMostrarResposta(true);
      setRespostaSelecionada(-1);
      setRespondido(true);
      return;
    }

    const timer = setTimeout(() => setTempo((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [tempo, mostrarResposta, respondido, saindo]);

  useEffect(() => {
    setTempo(TEMPO_MAX);
  }, [indice]);

  function responder(i) {
    if (respondido) return;

    setRespondido(true);

    const perguntaAtual = perguntasJogo[indice];
    const correta = perguntaAtual.correta;

    setRespostaSelecionada(i);
    setMostrarResposta(true);

    if (i === correta) {
      setPontuacao((p) => p + 10);
      somAcerto.current?.play().catch(() => {});
    }
  }

  function proximaPergunta() {
    if (saindo) return;

    if (indice + 1 < perguntasJogo.length) {
      setMostrarResposta(false);
      setRespostaSelecionada(null);
      setRespondido(false);
      setIndice((prev) => prev + 1);
    } else {
      finalizar(pontuacao);
    }
  }

  const pergunta = perguntasJogo[indice];

  if (!pergunta) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex items-center justify-center bg-black text-white"
      >
        <p className="text-sm text-gray-400 animate-pulse">
          Preparando perguntas...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/lab-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black/50 to-cyan-900/30" />

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-6 left-6 w-24 h-24 border-t border-l border-cyan-400/30" />
        <div className="absolute top-6 right-6 w-24 h-24 border-t border-r border-cyan-400/30" />
        <div className="absolute bottom-6 left-6 w-24 h-24 border-b border-l border-cyan-400/30" />
        <div className="absolute bottom-6 right-6 w-24 h-24 border-b border-r border-cyan-400/30" />
      </div>

      <motion.div
        className="w-full max-w-xs px-3 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: saindo ? 0 : 1, scale: saindo ? 0.95 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-10">
          <p className="text-cyan-400 text-xs font-bold">
            {indice + 1}/{perguntasJogo.length}
          </p>

          <p className="text-gray-300 text-xs">
            Pontos:{""}{" "}
            <span className="text-cyan-400 font-semibold">{pontuacao}</span>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(0,255,255,0.1)] p-4 pb-10 rounded-3xl flex flex-col gap-4 mt-12">
          <motion.h2
            key={indice}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base font-semibold text-white leading-relaxed"
          >
            {pergunta.pergunta}
          </motion.h2>

          <ProgressBar tempo={tempo} TEMPO_MAX={TEMPO_MAX} />

          <div className="flex flex-col gap-3">
            {pergunta.opcoes.map((op, i) => {
              let estilo =
                "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/50";

              if (mostrarResposta) {
                if (i === pergunta.correta) {
                  estilo =
                    "bg-green-500/20 border-green-400 shadow-lg shadow-green-400/30";
                } else if (i === respostaSelecionada) {
                  estilo =
                    "bg-red-500/20 border-red-400 shadow-lg shadow-red-400/30";
                }
              }

              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: !mostrarResposta ? 1.03 : 1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => !mostrarResposta && responder(i)}
                  className={`p-2 text-sm rounded-xl text-white border transition-all ${estilo}`}
                >
                  {op}
                </motion.button>
              );
            })}
          </div>

          {mostrarResposta && (
            <div className="flex flex-col gap-1 mt-3">
              {respostaSelecionada === -1 && (
                <p className="text-red-400 text-sm">⏰ Tempo esgotado</p>
              )}
              {respostaSelecionada !== -1 &&
                respostaSelecionada !== pergunta.correta && (
                  <p className="text-red-400 text-sm">✖ Resposta incorreta</p>
                )}

              {respostaSelecionada === pergunta.correta && (
                <p className="text-green-300 text-sm font-medium">
                  ✔ Resposta correta
                </p>
              )}

              <p className="text-green-300 text-sm">
                ✔ {pergunta.opcoes[pergunta.correta]}
              </p>

              <p className="text-xs text-gray-400 line-clamp-2">
                {pergunta.explicacao}
              </p>
            </div>
          )}
        </div>

        {mostrarResposta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 w-full max-w-xs px-3 "
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={proximaPergunta}
              className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-400 shadow-xl shadow-green-500/30"
            >
              {indice + 1 === perguntasJogo.length ? "Finalizar" : "Próxima →"}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
