export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    value: 'A' | 'B' | 'C';
    text: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Comment vous sentez-vous physiquement dans votre maison au quotidien ?",
    options: [
      { label: "A", value: "A", text: "Je me déplace facilement partout, sans effort." },
      { label: "B", value: "B", text: "Certains espaces (escaliers, jardin) commencent à me fatiguer." },
      { label: "C", value: "C", text: "J'évite certaines pièces ou étages car c'est devenu trop difficile." }
    ]
  },
  {
    id: 2,
    question: "Quel est l'état général de votre maison ?",
    options: [
      { label: "A", value: "A", text: "Elle est en excellent état, je l'entretiens régulièrement." },
      { label: "B", value: "B", text: "Il y a des travaux à prévoir, mais rien d'urgent." },
      { label: "C", value: "C", text: "Plusieurs réparations importantes s'accumulent sans être faites." }
    ]
  },
  {
    id: 3,
    question: "Comment gérez-vous l'entretien extérieur (jardin, toiture, façade) ?",
    options: [
      { label: "A", value: "A", text: "Je m'en occupe moi-même ou j'ai une aide régulière." },
      { label: "B", value: "B", text: "Cela devient une charge, je fais le minimum." },
      { label: "C", value: "C", text: "C'est une vraie source de stress et d'épuisement." }
    ]
  },
  {
    id: 4,
    question: "Quel est le poids financier de votre logement actuel ?",
    options: [
      { label: "A", value: "A", text: "Très raisonnable, je gère facilement." },
      { label: "B", value: "B", text: "Les charges augmentent et pèsent sur mon budget." },
      { label: "C", value: "C", text: "Les dépenses liées à la maison (énergie, taxes, travaux) grèvent sérieusement mes finances." }
    ]
  },
  {
    id: 5,
    question: "Vous sentez-vous en sécurité dans votre logement ?",
    options: [
      { label: "A", value: "A", text: "Oui, totalement serein(e)." },
      { label: "B", value: "B", text: "Parfois je m'inquiète (chutes, isolation)." },
      { label: "C", value: "C", text: "La peur d'un accident ou d'un problème me préoccupe souvent." }
    ]
  },
  {
    id: 6,
    question: "Comment décririez-vous votre vie sociale depuis votre logement ?",
    options: [
      { label: "A", value: "A", text: "Je reçois facilement famille et amis." },
      { label: "B", value: "B", text: "C'est moins pratique qu'avant, les visites se font rares." },
      { label: "C", value: "C", text: "Je me sens isolé(e), les proches viennent rarement." }
    ]
  },
  {
    id: 7,
    question: "Avez-vous accès facilement aux commerces, médecins, et services ?",
    options: [
      { label: "A", value: "A", text: "Oui, tout est à proximité ou accessible." },
      { label: "B", value: "B", text: "Ça dépend, certains trajets sont compliqués." },
      { label: "C", value: "C", text: "Non, je suis très dépendant(e) des autres pour mes déplacements." }
    ]
  },
  {
    id: 8,
    question: "Utilisez-vous vraiment tous les espaces de votre logement ?",
    options: [
      { label: "A", value: "A", text: "Oui, chaque pièce a son utilité." },
      { label: "B", value: "B", text: "Plusieurs pièces sont peu ou plus utilisées." },
      { label: "C", value: "C", text: "Je vis principalement dans 2 ou 3 pièces, le reste est vide." }
    ]
  },
  {
    id: 9,
    question: "Avez-vous déjà pensé à déménager pour un logement plus adapté ?",
    options: [
      { label: "A", value: "A", text: "Non, je n'y ai jamais pensé." },
      { label: "B", value: "B", text: "Oui, l'idée m'effleure parfois." },
      { label: "C", value: "C", text: "Oui, j'y pense souvent, mais je ne sais pas par où commencer." }
    ]
  },
  {
    id: 10,
    question: "Si vous vendiez, qu'est-ce que cela vous apporterait ?",
    options: [
      { label: "A", value: "A", text: "Rien de particulier, je suis bien ici." },
      { label: "B", value: "B", text: "Un peu plus de confort et de simplicité." },
      { label: "C", value: "C", text: "Un énorme soulagement : moins de soucis, plus de liberté et de sécurité financière." }
    ]
  }
];

export const scoreValues: Record<'A' | 'B' | 'C', number> = {
  'A': 0,
  'B': 1,
  'C': 3
};

export type ProfilType = 'serein' | 'reflexion' | 'urgence';

export function calculateProfile(score: number): ProfilType {
  if (score < 8) return 'serein';
  if (score <= 18) return 'reflexion';
  return 'urgence';
}

export interface ProfilResult {
  type: ProfilType;
  icon: 'check' | 'scale' | 'lifebuoy';
  iconColor: string;
  title: string;
  analysis: string;
  cta: string;
  ctaLink: string;
}

export const profilResults: Record<ProfilType, ProfilResult> = {
  serein: {
    type: 'serein',
    icon: 'check',
    iconColor: 'text-green-600',
    title: 'Tout va bien ! Vous êtes en maîtrise.',
    analysis: "Votre maison semble encore bien adaptée à votre mode de vie. Il n'y a pas d'urgence, mais restez vigilant sur l'entretien.",
    cta: 'Télécharger mon guide des prix du marché pour information',
    ctaLink: '#'
  },
  reflexion: {
    type: 'reflexion',
    icon: 'scale',
    iconColor: 'text-orange-500',
    title: 'La question se pose...',
    analysis: "Votre maison commence à devenir une charge. Vous gérez encore, mais les premiers signes de fatigue ou de coûts inutiles apparaissent. C'est le moment idéal pour anticiper sans subir.",
    cta: 'Demander un conseil stratégique gratuit',
    ctaLink: '#contact'
  },
  urgence: {
    type: 'urgence',
    icon: 'lifebuoy',
    iconColor: 'text-red-500',
    title: 'Il est temps de penser à vous.',
    analysis: "Votre maison est devenue un frein à votre qualité de vie et à vos finances. Vous gagneriez immensément en confort, sécurité et argent en changeant de logement rapidement.",
    cta: 'Réserver mon Audit Sérénité (Offert)',
    ctaLink: '#contact'
  }
};
