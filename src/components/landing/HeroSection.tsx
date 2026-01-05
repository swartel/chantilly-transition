import { Button } from "@/components/ui/button";
import heroImage from "@/assets/chantilly-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Vue aérienne du Château de Chantilly" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>
      
      <div className="section-container relative z-10 py-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 animate-fade-in text-balance">
            Libérez-vous de votre grande maison et financez une retraite sereine à Chantilly, sans gérer le moindre carton.
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Vous vendez bien plus que des murs : nous organisons votre transition complète d'une maison devenue trop grande vers un logement confortable, sécurisé et économe, tout en préservant votre patrimoine.
          </p>
          
          <Button variant="hero" size="xl" className="animate-slide-up mb-12" style={{ animationDelay: '0.4s' }}>
            Demander mon audit "Sérénité" offert
          </Button>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-serif text-xl mb-4 text-primary">Pour qui est-ce idéal ?</h3>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🏠</span>
                <span>Vous êtes propriétaire d'une maison familiale sur Chantilly ou environs qui demande trop d'entretien.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl mt-0.5">📍</span>
                <span>Vous souhaitez rester dans la région mais vous rapprocher des commodités et gagner en sécurité.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl mt-0.5">📦</span>
                <span>L'idée de trier 30 ans de souvenirs et de gérer un déménagement vous semble insurmontable.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
