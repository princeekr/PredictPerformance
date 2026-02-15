import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface ResultSectionProps {
  score: number | null;
}

const ResultSection = ({ score }: ResultSectionProps) => {
  const displayScore = score !== null ? score : null;

  return (
    <section id="results" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Your <span className="gradient-text">Result</span>
          </h2>
          <p className="text-muted-foreground">AI-powered performance prediction</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-6 md:p-10"
        >
          {/* Score Display */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2 flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Predicted Performance Score
            </p>
            <motion.div
              key={displayScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-7xl md:text-8xl font-extrabold gradient-text leading-none"
            >
              {displayScore !== null ? displayScore : "--"}
            </motion.div>
            <p className="text-muted-foreground text-sm mt-2">
              {displayScore !== null ? "out of 100" : "Enter details above to predict"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultSection;
