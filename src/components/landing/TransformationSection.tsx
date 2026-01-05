import happyCoupleImage from "@/assets/happy-couple.jpg";
import modernApartmentImage from "@/assets/modern-apartment.jpg";

const TransformationSection = () => {
  const benefits = [
    {
      emoji: "🏡",
      title: "Sécurité et Confort",
      description: "Un logement moderne, de plain-pied ou avec ascenseur, chaud en hiver et facile à vivre."
    },
    {
      emoji: "💰",
      title: "Gain financier immédiat",
      description: "Vous baissez vos charges mensuelles et récupérez la différence de prix entre votre maison et votre nouvel appartement (Cash-out)."
    },
    {
      emoji: "👥",
      title: "Lien social retrouvé",
      description: "Tout se fait à pied. Commerces, médecins et amis sont à deux pas, vous ne dépendez plus de votre voiture."
    },
    {
      emoji: "✨",
      title: "Zéro stress logistique",
      description: "Vous ne portez rien. Nous gérons la transition pour que vous n'ayez qu'à poser vos valises."
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="section-container">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-balance">
          Imaginez une retraite où votre seule préoccupation est de profiter de vos proches.
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed">
          Passez d'une situation où vous <span className="highlight-text">subissez votre logement</span> à une vie choisie. Quittez la charge mentale des travaux et de l'entretien pour retrouver la légèreté d'un quotidien sécurisé, tout en récupérant un capital financier important pour gâter vos enfants ou voyager.
        </p>

        {/* Images grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-lg overflow-hidden shadow-card">
            <img 
              src={modernApartmentImage} 
              alt="Appartement moderne et lumineux" 
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-card">
            <img 
              src={happyCoupleImage} 
              alt="Couple heureux en centre-ville" 
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <h3 className="font-serif text-xl mb-6 text-primary">Ce que ça change concrètement :</h3>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300"
            >
              <span className="text-2xl">{benefit.emoji}</span>
              <div>
                <h4 className="font-semibold text-primary mb-1">{benefit.title}</h4>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
