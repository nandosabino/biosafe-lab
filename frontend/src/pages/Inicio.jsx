import { motion } from "framer-motion";
import { useState } from "react";
import { nomeExiste } from "../utils/storage";

export default function Inicio({ iniciar, verRanking }) {
  const [erro, setErro] = useState("");

  const [nome, setNome] = useState("");

  const entrar = async () => {
    const nomeLimpo = nome.trim();

    if (!nomeLimpo) {
      setErro("Digite um nome para continuar");
      return;
    }

    const existe = await nomeExiste(nomeLimpo);

    if (existe) {
      setErro("Esse nome já foi usado!");
      return;
    }

    setErro("");

    localStorage.setItem("usuario", nomeLimpo);

    iniciar(nomeLimpo);
  };

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
        key="inicio"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center w-full px-4"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_60px_rgba(0,255,255,0.15)] rounded-3xl px-5 py-7 flex flex-col gap-4 items-center text-center max-w-sm w-full">
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-[-150px] left-[-150px]" />
            <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-24 h-24 text-4xl bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            🧪
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight mt-2">
            BioSafe Lab 🧪
          </h1>

          <p className="text-gray-300 leading-relaxed text-sm text-center">
            Você está entrando em um ambiente de risco controlado.
            <br />
            Cada decisão pode evitar{" "}
            <span className="text-cyan-400 font-medium"> contaminações </span>
            {""}
            ou causar acidentes graves.
          </p>

          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-300">
            ⚠️ Siga os protocolos de biossegurança corretamente
          </div>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            autoComplete="off"
            spellCheck={false}
            name="no-autocomplete"
            className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-gray-400 focus:outline-none transition
${
  erro
    ? "border-red-400 focus:ring-red-400"
    : "border-white/20 focus:border-cyan-400 focus:ring-cyan-400"
}`}
          />

          {erro && (
            <p className="text-red-400 text-sm text-left w-full mt-1">
              ⚠ {erro}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={entrar}
            className="w-full max-w-sm px-10 py-3 mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-cyan-400/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Iniciar Simulação
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={verRanking}
            className="px-8 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-300 hover:bg-white/20 transition"
          >
            Ver Ranking
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
