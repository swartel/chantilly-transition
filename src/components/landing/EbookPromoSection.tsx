import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, CheckCircle } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.png";

const EbookPromoSection = () => {
  const benefits = [
    "Les 7 erreurs les plus coûteuses à éviter",
    "Des conseils d'expert du marché chantillois",
    "Un plan d'action concret pour votre projet",
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Ebook Cover */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl blur-xl" />
              <img
                src={ebookCover}
                alt="Guide gratuit : Les 7 erreurs qui coûtent cher aux retraités de Chantilly"
                className="relative w-64 sm:w-72 lg:w-80 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Guide Gratuit
            </span>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-primary mb-4 text-balance">
              Évitez les erreurs qui coûtent cher aux retraités de Chantilly
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Découvrez les 7 erreurs les plus fréquentes lors de la vente d'une maison familiale et comment les éviter pour maximiser votre patrimoine.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Link to="/guide-gratuit">
              <Button variant="cta" size="xl" className="group">
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Télécharger le guide gratuit
              </Button>
            </Link>
            
            <p className="mt-4 text-sm text-muted-foreground">
              Téléchargement immédiat • Aucun engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookPromoSection;
