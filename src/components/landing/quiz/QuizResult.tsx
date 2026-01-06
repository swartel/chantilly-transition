import { motion } from "framer-motion";
import { CheckCircle, Scale, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfilResult } from "./quizData";

interface QuizResultProps {
  result: ProfilResult;
  prenom: string;
}

const iconMap = {
  check: CheckCircle,
  scale: Scale,
  lifebuoy: LifeBuoy
};

export default function QuizResult({ result, prenom }: QuizResultProps) {
  const Icon = iconMap[result.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card rounded-xl p-8 md:p-10 shadow-lg border border-border text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <Icon className={`w-20 h-20 mx-auto ${result.iconColor}`} strokeWidth={1.5} />
        </motion.div>

        {/* Greeting */}
        <p className="text-muted-foreground mb-2">
          {prenom}, voici votre Bilan Sérénité :
        </p>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-6">
          {result.title}
        </h3>

        {/* Profile Badge */}
        <div className="inline-block mb-6">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            result.type === 'serein' 
              ? 'bg-green-100 text-green-700' 
              : result.type === 'reflexion'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-red-100 text-red-700'
          }`}>
            Profil : {result.type === 'serein' ? 'Propriétaire Serein' : result.type === 'reflexion' ? 'Propriétaire en Réflexion' : 'Urgence Sérénité'}
          </span>
        </div>

        {/* Analysis */}
        <div className="bg-secondary/50 rounded-lg p-6 mb-8">
          <p className="text-foreground leading-relaxed">
            {result.analysis}
          </p>
        </div>

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className={`font-semibold ${
            result.type === 'urgence' 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-accent hover:bg-accent/90 text-accent-foreground'
          }`}
        >
          <a href={result.ctaLink}>
            {result.cta}
          </a>
        </Button>

        {/* Additional info for urgence profile */}
        {result.type === 'urgence' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground mt-4"
          >
            📞 Ou appelez directement : <a href="tel:0687090937" className="text-link font-semibold">06 87 09 09 37</a>
          </motion.p>
        )}
      </div>

      {/* Footer note */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Ce bilan est une indication. Pour une analyse complète et personnalisée, n'hésitez pas à me contacter.
      </p>
    </motion.div>
  );
}
