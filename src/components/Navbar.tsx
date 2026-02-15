import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold gradient-text">SP Predictor</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#home" className="hover:text-foreground transition-colors">Home</a>
          <a href="#predict" className="hover:text-foreground transition-colors">Predict</a>
          <a href="#results" className="hover:text-foreground transition-colors">Results</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
