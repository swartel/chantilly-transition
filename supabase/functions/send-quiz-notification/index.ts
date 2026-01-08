import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY");
const MAILGUN_DOMAIN = "api.eu.mailgun.net/v3/immobilier-chantilly.fr/messages";
const NOTIFICATION_EMAIL = "contact@immobilier-chantilly.fr";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuizLeadNotification {
  prenom: string;
  email: string;
  telephone?: string;
  score: number;
  profil: 'serein' | 'reflexion' | 'urgence';
  reponses: Record<number, string>;
}

const profilLabels = {
  serein: '🟢 Propriétaire Serein',
  reflexion: '🟠 Propriétaire en Réflexion',
  urgence: '🔴 Urgence Sérénité'
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-quiz-notification");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lead: QuizLeadNotification = await req.json();
    console.log("Lead data received:", { prenom: lead.prenom, email: lead.email, profil: lead.profil, score: lead.score });

    if (!MAILGUN_API_KEY) {
      console.error("MAILGUN_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Build the email content
    const emailSubject = `🏠 Nouveau lead Quiz Sérénité - ${profilLabels[lead.profil]}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
          .header { background-color: #0d3b66; color: white; padding: 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .profile-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-bottom: 20px; }
          .profile-serein { background-color: #dcfce7; color: #166534; }
          .profile-reflexion { background-color: #fed7aa; color: #9a3412; }
          .profile-urgence { background-color: #fecaca; color: #dc2626; }
          .info-block { background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
          .info-label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
          .info-value { color: #1e293b; font-size: 16px; }
          .score { font-size: 32px; font-weight: bold; color: #0d3b66; }
          .footer { background-color: #f8fafc; padding: 15px; text-align: center; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏠 Nouveau Lead Quiz Sérénité</h1>
          </div>
          <div class="content">
            <span class="profile-badge profile-${lead.profil}">${profilLabels[lead.profil]}</span>
            
            <div class="info-block">
              <div class="info-label">Score</div>
              <div class="score">${lead.score} / 30 points</div>
            </div>
            
            <div class="info-block">
              <div class="info-label">Prénom</div>
              <div class="info-value">${lead.prenom}</div>
            </div>
            
            <div class="info-block">
              <div class="info-label">Email</div>
              <div class="info-value"><a href="mailto:${lead.email}">${lead.email}</a></div>
            </div>
            
            ${lead.telephone ? `
            <div class="info-block">
              <div class="info-label">Téléphone</div>
              <div class="info-value"><a href="tel:${lead.telephone}">${lead.telephone}</a></div>
            </div>
            ` : ''}
            
            <div class="info-block">
              <div class="info-label">Réponses détaillées</div>
              <div class="info-value">${Object.entries(lead.reponses).map(([q, a]) => `Q${q}: ${a}`).join(' | ')}</div>
            </div>
            
            <p style="margin-top: 20px; color: #64748b;">
              ${lead.profil === 'urgence' 
                ? '⚡ <strong>PRIORITÉ HAUTE</strong> - Ce prospect a un besoin urgent. Contactez-le rapidement !'
                : lead.profil === 'reflexion'
                ? '📞 Ce prospect est en phase de réflexion. Un appel de conseil serait bienvenu.'
                : '📋 Ce prospect est serein. Un suivi informatif peut être utile.'}
            </p>
          </div>
          <div class="footer">
            Quiz Sérénité - Immobilier Chantilly<br>
            ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Mailgun API
    const formData = new FormData();
    formData.append("from", "Quiz Sérénité <quiz@immobilier-chantilly.fr>");
    formData.append("to", NOTIFICATION_EMAIL);
    formData.append("subject", emailSubject);
    formData.append("html", emailHtml);

    // For Mailgun EU region, use api.eu.mailgun.net
    // For US region, use api.mailgun.net
    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

    console.log("Sending email to Mailgun...");
    
    const response = await fetch(mailgunUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      },
      body: formData,
    });

    const responseText = await response.text();
    console.log("Mailgun response status:", response.status);
    console.log("Mailgun response:", responseText);

    if (!response.ok) {
      console.error("Mailgun error:", responseText);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: responseText }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Email sent successfully!");
    
    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-quiz-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
