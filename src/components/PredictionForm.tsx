import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Award,
  Activity,
  Moon,
  FileText,
  Sparkles,
} from "lucide-react";

interface PredictionFormProps {
  onPredict: (data: FormData) => void;
  loading?: boolean;
}

interface FormData {
  hoursStudied: string;
  previousScores: string;
  extracurricular: string;
  sleepHours: string;
  samplePapers: string;
}

const PredictionForm = ({ onPredict, loading }: PredictionFormProps) => {
  const [form, setForm] = useState<FormData>({
    hoursStudied: "",
    previousScores: "",
    extracurricular: "Yes",
    sleepHours: "",
    samplePapers: "",
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(form);
  };

  const fields = [
    { key: "hoursStudied" as const, label: "Hours Studied", icon: Clock, type: "number", placeholder: "e.g. 7" },
    { key: "previousScores" as const, label: "Previous Scores", icon: Award, type: "number", placeholder: "e.g. 85" },
    { key: "sleepHours" as const, label: "Sleep Hours", icon: Moon, type: "number", placeholder: "e.g. 7" },
    { key: "samplePapers" as const, label: "Sample Papers Practiced", icon: FileText, type: "number", placeholder: "e.g. 5" },
  ];

  return (
    <section id="predict" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Predict</span> Your Performance
          </h2>
          <p className="text-muted-foreground">Fill in your study details below</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-6 md:p-10 space-y-6"
        >
          {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
            <div key={key} className="relative">
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                {label}
              </label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onFocus={() => setFocused(key)}
                  onBlur={() => setFocused(null)}
                  placeholder={placeholder}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 ${focused === key
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-muted-foreground/30"
                    }`}
                />
              </div>
            </div>
          ))}

          {/* Dropdown */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Extracurricular Activities
            </label>
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <select
                value={form.extracurricular}
                onChange={(e) => handleChange("extracurricular", e.target.value)}
                onFocus={() => setFocused("extracurricular")}
                onBlur={() => setFocused(null)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border text-foreground outline-none transition-all duration-300 appearance-none ${focused === "extracurricular"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-muted-foreground/30"
                  }`}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            className={`w-full gradient-button text-primary-foreground font-semibold py-3.5 rounded-xl text-lg flex items-center justify-center gap-2 relative ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <Activity className="h-5 w-5 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Predict Performance
                </>
              )}
            </span>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default PredictionForm;
