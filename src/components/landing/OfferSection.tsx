const OfferSection = () => {
  const methods = [
    {
      emoji: "🔄",
      title: "Synchronisation Vente/Achat",
      description: "Nous ne vendons pas tant que nous n'avons pas validé ensemble où vous allez habiter. Pas de saut dans l'inconnu."
    },
    {
      emoji: "🔑",
      title: "Logistique \"Clé en main\"",
      description: "J'active mon réseau de partenaires de confiance pour le tri, le débarras et le déménagement."
    },
    {
      emoji: "📍",
      title: "Expertise locale Chantilly",
      description: "Une estimation précise pour vendre au meilleur prix et une connaissance pointue du marché pour dénicher votre futur cocon."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="bg-card rounded-xl p-8 lg:p-12 shadow-card">
          <span className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Mon Offre Sérénité
          </span>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-balance">
            Un accompagnement unique à Chantilly : De l'estimation à l'emménagement.
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
            Je ne suis pas là juste pour planter un panneau "À Vendre". Je suis votre <span className="highlight-text">partenaire de transition de vie</span>. Je coordonne la vente de votre bien actuel et l'installation dans le nouveau, en synchronisant parfaitement les deux opérations pour que vous n'ayez jamais à vous inquiéter de "l'après".
          </p>

          <h3 className="font-serif text-xl mb-6 text-primary">Notre méthode de travail :</h3>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {methods.map((method, index) => (
              <div 
                key={index}
                className="bg-secondary/50 rounded-lg p-6 hover:bg-secondary transition-colors duration-300"
              >
                <span className="text-3xl mb-4 block">{method.emoji}</span>
                <h4 className="font-serif text-lg text-primary mb-2">{method.title}</h4>
                <p className="text-muted-foreground">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
