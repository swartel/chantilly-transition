import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Download, Shield, BookOpen, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { externalSupabase } from "@/lib/external-supabase";
import ebookCover from "@/assets/ebook-cover.png";

const EbookDownload = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.prenom.trim() || !formData.email.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Store lead in external Supabase
      const { error } = await externalSupabase
        .from("ebook_leads")
        .insert([
          {
            prenom: formData.prenom.trim(),
            email: formData.email.trim(),
            source: "ebook-7-erreurs",
          },
        ]);

      if (error) {
        console.error("Error saving ebook lead:", error);
      }

      setIsSubmitted(true);
      
    } catch (err) {
      console.error("Error:", err);
      // Still show success to user even if DB fails
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Les 7 erreurs les plus coûteuses à éviter",
    "Des conseils pratiques de professionnel",
    "Guide spécifique pour Chantilly et environs",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-5xl w-full">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                {/* Left side - Ebook cover and info */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative mx-auto lg:mx-0 max-w-xs sm:max-w-sm"
                  >
                    {/* Ebook cover with shadow effect */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-black/30 blur-2xl transform translate-x-4 translate-y-4 rounded-lg" />
                      <img
                        src={ebookCover}
                        alt="Guide: Les 7 erreurs qui coûtent cher aux retraités de Chantilly"
                        className="relative rounded-lg shadow-2xl w-full"
                      />
                    </div>

                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    >
                      GRATUIT
                    </motion.div>
                  </motion.div>

                  {/* Benefits list - mobile only */}
                  <div className="mt-8 lg:hidden space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3 text-cream/90"
                      >
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right side - Form */}
                <div className="order-1 lg:order-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl"
                  >
                    {/* Warning badge */}
                    <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2 mb-6">
                      <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-primary font-medium">
                        Ces erreurs peuvent vous coûter des milliers d'euros
                      </span>
                    </div>

                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-2">
                      Téléchargez votre guide gratuit
                    </h1>
                    
                    <p className="text-muted-foreground mb-6">
                      Découvrez les <strong className="text-primary">7 erreurs fatales</strong> que commettent 
                      les retraités de Chantilly lorsqu'ils vendent leur maison familiale.
                    </p>

                    {/* Benefits list - desktop only */}
                    <div className="hidden lg:block space-y-3 mb-6">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-3 text-foreground/80"
                        >
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="prenom" className="text-foreground">
                          Votre prénom
                        </Label>
                        <Input
                          id="prenom"
                          type="text"
                          placeholder="Jean-Pierre"
                          value={formData.prenom}
                          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-foreground">
                          Votre email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jean-pierre@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="cta"
                        size="xl"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Recevoir mon guide gratuit
                          </>
                        )}
                      </Button>
                    </form>

                    {/* Trust indicators */}
                    <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>Données sécurisées</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>Lecture 5 min</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Author info */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-6 text-cream/70 text-sm"
                  >
                    Par <strong className="text-cream">Stéphane Wartel</strong>, 
                    Consultant Immobilier Local à Chantilly
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg mx-auto text-center"
              >
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-2xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-accent" />
                  </motion.div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4">
                    Merci {formData.prenom} !
                  </h2>

                  <p className="text-muted-foreground mb-6">
                    Votre guide est en route vers <strong className="text-primary">{formData.email}</strong>.
                    Vérifiez votre boîte mail (et vos spams) dans les prochaines minutes.
                  </p>

                  <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-foreground">
                      💡 <strong>En attendant</strong>, pourquoi ne pas évaluer 
                      votre situation avec notre quiz gratuit ?
                    </p>
                  </div>

                  <Button
                    variant="cta"
                    size="lg"
                    onClick={() => window.location.href = "/#quiz"}
                  >
                    Faire le quiz maintenant
                  </Button>

                  <p className="mt-6 text-xs text-muted-foreground">
                    Ou <a href="/" className="text-link hover:text-link-hover underline">retourner à l'accueil</a>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EbookDownload;
