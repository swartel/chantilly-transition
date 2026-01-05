const ChallengesSection = () => {
  const challenges = [
    {
      emoji: "😓",
      title: "La fatigue chronique",
      description: "Le jardin, le ménage des pièces vides et l'entretien courant vous épuisent physiquement et vous prennent tout votre temps libre."
    },
    {
      emoji: "⚠️",
      title: "L'insécurité au quotidien",
      description: "Les escaliers deviennent difficiles à monter et vous craignez la chute ou l'isolement si vous ne pouvez plus conduire."
    },
    {
      emoji: "💸",
      title: "Le gouffre financier",
      description: "Chauffer une maison à moitié vide et payer une taxe foncière élevée grignote votre retraite, réduisant votre budget \"plaisir\"."
    },
    {
      emoji: "😰",
      title: "La peur de la logistique",
      description: "Vous savez qu'il faudrait partir, mais vous vous sentez paralysé face à l'ampleur de la tâche (trier, vider, déménager)."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="section-container">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 text-balance">
          Votre maison familiale est-elle devenue une source d'inquiétude plutôt que de plaisir ?
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Des situations que vous vivez peut-être au quotidien :
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-6 shadow-soft hover:shadow-card transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{challenge.emoji}</span>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-primary">{challenge.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{challenge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
