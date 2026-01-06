import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit: (data: { prenom: string; email: string; telephone?: string }) => void;
  isSubmitting: boolean;
}

export default function LeadCaptureForm({ onSubmit, isSubmitting }: LeadCaptureFormProps) {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!prenom.trim()) {
      newErrors.prenom = "Veuillez entrer votre prénom";
    } else if (prenom.length > 50) {
      newErrors.prenom = "Le prénom ne peut pas dépasser 50 caractères";
    }
    
    if (!email.trim()) {
      newErrors.email = "Veuillez entrer votre email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }
    
    if (telephone && !/^[\d\s+()-]{0,20}$/.test(telephone)) {
      newErrors.telephone = "Numéro de téléphone invalide";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        prenom: prenom.trim(),
        email: email.trim().toLowerCase(),
        telephone: telephone.trim() || undefined
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-primary mb-2">
            Votre analyse est prête.
          </h3>
          <p className="text-muted-foreground">
            Renseignez vos coordonnées pour découvrir votre profil personnalisé et recevoir vos conseils.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="prenom" className="text-foreground">Prénom *</Label>
            <Input
              id="prenom"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Votre prénom"
              className={errors.prenom ? "border-destructive" : ""}
              maxLength={50}
            />
            {errors.prenom && (
              <p className="text-destructive text-sm mt-1">{errors.prenom}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className={errors.email ? "border-destructive" : ""}
              maxLength={255}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="telephone" className="text-foreground">Téléphone (optionnel)</Label>
            <Input
              id="telephone"
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="06 12 34 56 78"
              className={errors.telephone ? "border-destructive" : ""}
              maxLength={20}
            />
            {errors.telephone && (
              <p className="text-destructive text-sm mt-1">{errors.telephone}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Découvrir mon profil et mes conseils"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Vos données sont protégées et ne seront jamais partagées.
        </p>
      </div>
    </motion.div>
  );
}
