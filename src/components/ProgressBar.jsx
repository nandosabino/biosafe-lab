import { motion } from "framer-motion";

export default function ProgressBar({ tempo, TEMPO_MAX }) {
  const corBarra =
    tempo > 6
      ? "from-cyan-400 to-blue-500"
      : tempo > 3
        ? "from-yellow-400 to-orange-500"
        : "from-red-500 to-red-600";

  const shakeAnimation = {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
  };

  return (
    <motion.div animate={tempo <= 3 ? shakeAnimation : {}}>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${corBarra}`}
          animate={{ width: `${(tempo / TEMPO_MAX) * 100}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>

      <p
        className={`text-[10px] text-right mt-1 font-medium ${
          tempo <= 3 ? "text-red-400" : "text-gray-400"
        }`}
      >
        {tempo > 0 ? `${tempo}s` : "⏰"}
      </p>
    </motion.div>
  );
}
