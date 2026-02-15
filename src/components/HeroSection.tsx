import { motion } from "framer-motion";
import heroImg from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-bg)" }} />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="gradient-text">Student Performance</span>
              <br />
              Predictor
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8">
              Enter your study habits and get an AI-based performance prediction instantly.
            </p>
            <motion.a
              href="#predict"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block gradient-button text-primary-foreground font-semibold px-8 py-3 rounded-lg text-lg relative z-10"
            >
              <span className="relative z-10">Get Started</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <img
              src={heroImg}
              alt="Student analytics illustration"
              className="w-full max-w-md rounded-2xl animate-float"
              style={{ animationDelay: "1s" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
