import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ebookCover from "@/assets/ebook-cover.png";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleExitIntent = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves from the top of the viewport
    if (e.clientY <= 0 && !hasShown) {
      const dismissed = localStorage.getItem("ebook-popup-dismissed");
      const dismissedTime = dismissed ? parseInt(dismissed) : 0;
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

      // Show popup if never dismissed or dismissed more than 24h ago
      if (!dismissed || dismissedTime < oneDayAgo) {
        setIsOpen(true);
        setHasShown(true);
      }
    }
  }, [hasShown]);

  useEffect(() => {
    // Don't show on ebook download page
    if (location.pathname === "/guide-gratuit") return;

    document.addEventListener("mouseleave", handleExitIntent);
    return () => document.removeEventListener("mouseleave", handleExitIntent);
  }, [handleExitIntent, location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("ebook-popup-dismissed", Date.now().toString());
  };

  const handleDownload = () => {
    handleClose();
    navigate("/guide-gratuit");
  };

  const benefits = [
    "Les 7 erreurs coûteuses à éviter",
    "Conseils d'expert local",
    "Plan d'action concret",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-display font-bold text-primary-foreground text-center">
                Attendez ! Ne partez pas les mains vides...
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="p-6 bg-background">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {/* Ebook cover */}
              <div className="flex-shrink-0">
                <img
                  src={ebookCover}
                  alt="Guide gratuit"
                  className="w-32 sm:w-40 rounded-lg shadow-lg"
                />
              </div>

              {/* Text content */}
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Téléchargez votre guide gratuit
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Découvrez les erreurs qui coûtent cher aux retraités de Chantilly lors de la vente de leur maison.
                </p>

                <ul className="space-y-2 mb-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-foreground justify-center sm:justify-start">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 space-y-3">
              <Button
                onClick={handleDownload}
                variant="cta"
                size="lg"
                className="w-full group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Oui, je veux mon guide gratuit !
              </Button>
              <button
                onClick={handleClose}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Non merci, je connais déjà tout
              </button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
