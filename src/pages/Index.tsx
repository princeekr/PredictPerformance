import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PredictionForm from "@/components/PredictionForm";
import Starfield from "@/components/Starfield";
import ResultSection from "@/components/ResultSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [score, setScore] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: {
    hoursStudied: string;
    previousScores: string;
    extracurricular: string;
    sleepHours: string;
    samplePapers: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hours_studied: parseFloat(data.hoursStudied),
          previous_scores: parseFloat(data.previousScores),
          extracurricular_activities: data.extracurricular,
          sleep_hours: parseFloat(data.sleepHours),
          sample_question_papers_practiced: parseFloat(data.samplePapers),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const result = await response.json();
      setScore(result.prediction);

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (error) {
      console.error("Prediction error:", error);
      // You might want to add a toast notification here if you have a toast hook
      alert("Failed to get prediction. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Starfield />
      <Navbar />
      <HeroSection />
      <PredictionForm onPredict={handlePredict} loading={loading} />
      <ResultSection score={score} />
      <Footer />
    </div>
  );
};

export default Index;
