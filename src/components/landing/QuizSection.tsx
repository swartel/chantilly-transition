import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import QuizCard from "./quiz/QuizCard";
import LeadCaptureForm from "./quiz/LeadCaptureForm";
import QuizResult from "./quiz/QuizResult";
import AnalyzingLoader from "./quiz/AnalyzingLoader";
import { quizQuestions, calculateProfile, profilResults, ProfilType } from "./quiz/quizData";
import { saveQuizLead, QuizLead } from "@/lib/external-supabase";

type QuizStep = 'quiz' | 'analyzing' | 'form' | 'result';

export default function QuizSection() {
  const { toast } = useToast();
  const [step, setStep] = useState<QuizStep>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [profile, setProfile] = useState<ProfilType | null>(null);
  const [leadData, setLeadData] = useState<{ prenom: string; email: string; telephone?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (value: 'A' | 'B' | 'C', points: number) => {
    const questionId = quizQuestions[currentQuestionIndex].id;
    
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setScore(prev => prev + points);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      // Next question
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      // Quiz completed - show analyzing animation
      setStep('analyzing');
    }
  };

  useEffect(() => {
    if (step === 'analyzing') {
      // Show analyzing animation for 2 seconds
      const timer = setTimeout(() => {
        const calculatedProfile = calculateProfile(score);
        setProfile(calculatedProfile);
        setStep('form');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, score]);

  const handleFormSubmit = async (data: { prenom: string; email: string; telephone?: string }) => {
    setIsSubmitting(true);
    setLeadData(data);

    const calculatedProfile = profile || calculateProfile(score);

    const leadPayload: QuizLead = {
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      score,
      profil: calculatedProfile,
      reponses: answers
    };

    // Save to external Supabase
    const saveResult = await saveQuizLead(leadPayload);
    
    if (!saveResult.success) {
      console.error('Failed to save lead:', saveResult.error);
      // Continue anyway to show results
    }

    // Send email notification via Netlify Function
    try {
      const response = await fetch('/.netlify/functions/send-quiz-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to send email notification:', errorText);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }

    setIsSubmitting(false);
    setStep('result');
    
    toast({
      title: "Merci !",
      description: "Votre Bilan Sérénité est prêt.",
    });
  };

  const resetQuiz = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers({});
    setProfile(null);
    setLeadData(null);
  };

  return (
    <section id="quiz" className="py-16 md:py-24 bg-secondary/30">
      <div className="section-container">
        {/* Section Header */}
        {step === 'quiz' && currentQuestionIndex === 0 && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
              Votre maison est-elle toujours adaptée à votre vie ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Répondez à 10 questions simples pour obtenir votre <strong>Bilan Sérénité</strong> personnalisé et découvrir si c'est le bon moment pour vendre.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              ⏱️ Temps estimé : 2 minutes
            </p>
          </div>
        )}

        {/* Quiz Content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'quiz' && (
              <QuizCard
                key={`question-${currentQuestionIndex}`}
                question={quizQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={quizQuestions.length}
              />
            )}

            {step === 'analyzing' && (
              <AnalyzingLoader key="analyzing" />
            )}

            {step === 'form' && (
              <LeadCaptureForm
                key="form"
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {step === 'result' && profile && leadData && (
              <QuizResult
                key="result"
                result={profilResults[profile]}
                prenom={leadData.prenom}
              />
            )}
          </AnimatePresence>

          {/* Reset button for testing */}
          {step === 'result' && (
            <div className="text-center mt-8">
              <button
                onClick={resetQuiz}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
              >
                Refaire le test
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
