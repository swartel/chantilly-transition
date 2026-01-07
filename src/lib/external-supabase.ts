import { createClient } from '@supabase/supabase-js';

// External Supabase client for lead storage
const EXTERNAL_SUPABASE_URL = import.meta.env.VITE_SUPABASE_DATABASE_URL;
const EXTERNAL_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const externalSupabase = createClient(EXTERNAL_SUPABASE_URL, EXTERNAL_SUPABASE_KEY);

export interface QuizLead {
  prenom: string;
  email: string;
  telephone?: string;
  score: number;
  profil: 'serein' | 'reflexion' | 'urgence';
  reponses: Record<number, string>;
}

export async function saveQuizLead(lead: QuizLead): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await externalSupabase
      .from('quiz_leads')
      .insert([{
        prenom: lead.prenom,
        email: lead.email,
        telephone: lead.telephone || null,
        score: lead.score,
        profil: lead.profil,
        reponses: lead.reponses,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error saving lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Error saving lead:', err);
    return { success: false, error: 'Une erreur est survenue' };
  }
}
