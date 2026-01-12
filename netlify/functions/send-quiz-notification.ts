import type { Handler, HandlerEvent } from "@netlify/functions";

interface QuizLeadNotification {
  prenom: string;
  email: string;
  telephone?: string;
  score: number;
  profil: 'serein' | 'reflexion' | 'urgence';
  reponses: Record<number, string>;
}

const MAILGUN_DOMAIN = "immobilier-chantilly.fr";
const NOTIFICATION_EMAIL = "contact@immobilier-chantilly.fr";

const profilLabels: Record<string, string> = {
  serein: 'Propriétaire Serein',
  reflexion: 'Propriétaire en Réflexion',
  urgence: 'Urgence Sérénité'
};

const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
    
    if (!MAILGUN_API_KEY) {
      console.error('MAILGUN_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    const lead: QuizLeadNotification = JSON.parse(event.body || '{}');
    
    const profilLabel = profilLabels[lead.profil] || lead.profil;
    
    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0d3b66; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .profile-badge { 
            display: inline-block; 
            padding: 8px 16px; 
            border-radius: 20px; 
            font-weight: bold;
            margin: 10px 0;
          }
          .profile-serein { background-color: #d4edda; color: #155724; }
          .profile-reflexion { background-color: #fff3cd; color: #856404; }
          .profile-urgence { background-color: #f8d7da; color: #721c24; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #0d3b66; }
          .cta { 
            display: inline-block; 
            background-color: #c9a227; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏠 Nouveau Lead Quiz Sérénité</h1>
          </div>
          <div class="content">
            <p>Un nouveau prospect a complété le quiz de maturité :</p>
            
            <div class="info-row">
              <span class="label">Prénom :</span> ${lead.prenom}
            </div>
            <div class="info-row">
              <span class="label">Email :</span> <a href="mailto:${lead.email}">${lead.email}</a>
            </div>
            ${lead.telephone ? `
            <div class="info-row">
              <span class="label">Téléphone :</span> <a href="tel:${lead.telephone}">${lead.telephone}</a>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Score :</span> ${lead.score} points
            </div>
            <div class="info-row">
              <span class="label">Profil :</span>
              <span class="profile-badge profile-${lead.profil}">${profilLabel}</span>
            </div>
            
            <h3>📋 Réponses détaillées :</h3>
            <div class="info-row">
              <pre>${JSON.stringify(lead.reponses, null, 2)}</pre>
            </div>
            
            ${lead.profil === 'urgence' ? `
            <p style="color: #721c24; font-weight: bold;">
              ⚠️ PRIORITÉ HAUTE : Ce prospect est en situation d'urgence et nécessite un contact rapide !
            </p>
            ` : ''}
            
            ${lead.profil === 'reflexion' ? `
            <p style="color: #856404;">
              📞 Ce prospect est en phase de réflexion active. Un appel dans les 48h serait idéal.
            </p>
            ` : ''}
            
            <a href="mailto:${lead.email}" class="cta">Contacter ${lead.prenom}</a>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send via Mailgun EU API
    const formData = new URLSearchParams();
    formData.append('from', 'Quiz Sérénité <quiz@immobilier-chantilly.fr>');
    formData.append('to', NOTIFICATION_EMAIL);
    formData.append('subject', `🏠 Nouveau lead Quiz - ${profilLabel} - ${lead.prenom}`);
    formData.append('html', emailHtml);

    const response = await fetch(
      `https://api.eu.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mailgun error:', errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to send email', details: errorText })
      };
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Notification sent' })
    };

  } catch (error: any) {
    console.error('Error in send-quiz-notification:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

export { handler };
