import { motion } from "framer-motion";
import { QuizQuestion, scoreValues } from "./quizData";

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (value: 'A' | 'B' | 'C', points: number) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizCard({ question, onAnswer, currentQuestion, totalQuestions }: QuizCardProps) {
  const handleSelect = (value: 'A' | 'B' | 'C') => {
    const points = scoreValues[value];
    onAnswer(value, points);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion} sur {totalQuestions}</span>
          <span>{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: `${((currentQuestion - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-serif text-primary mb-6 text-center">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                {option.label}
              </span>
              <span className="text-foreground group-hover:text-primary transition-colors">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
