import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="section-container text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-primary-foreground text-balance">
          Ne laissez pas votre maison décider de votre qualité de vie.
        </h2>
        
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Prenez les devants pour une retraite dorée et libre. Discutons de votre projet autour d'un café, sans engagement. Je vous offrirai une première estimation de votre capacité financière et un plan d'action clair.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="xl"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Je réserve mon rendez-vous conseil
          </Button>
          
          <span className="text-primary-foreground/60">ou</span>
          
          <a 
            href="tel:+33687090937" 
            className="text-lg font-semibold text-primary-foreground hover:text-accent transition-colors duration-200 underline underline-offset-4"
          >
            M'appeler au 06 87 09 09 37
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
