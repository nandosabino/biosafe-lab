import { motion } from "framer-motion";

export default function ProgressBar({ tempo, TEMPO_MAX }) {
  const corBarra =
    tempo > TEMPO_MAX * 0.5
      ? "from-green-400 to-green-600"
      : tempo > TEMPO_MAX * 0.25
        ? "from-yellow-400 to-orange-600"
        : "from-red-500 to-red-700";

  const shakeAnimation = {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
  };

  return (
    <motion.div
      animate={tempo <= 3 ? { x: [0, -6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.4, repeat: tempo <= 3 ? Infinity : 0 }}
    >
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${corBarra} ${tempo <= 3 ? "shadow-lg shadow-red-500/50" : ""}`}
          animate={{ width: `${(tempo / TEMPO_MAX) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <p
        className={`text-[10px] text-right mt-1 font-medium ${
          tempo <= 3 ? "text-red-400 animate-pulse" : "text-gray-400"
        }`}
      >
        {tempo > 0 ? `${tempo}s` : "⏰ Tempo esgotado"}
      </p>
    </motion.div>
  );
}
