import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { naam, telefoon, email, bericht } = body;

    if (!naam || !telefoon || !bericht) {
      return new Response(
        JSON.stringify({ error: 'Vul alle verplichte velden in.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await resend.emails.send({
      from: 'SLIM Website <onboarding@resend.dev>',
      to: 'slim.klussen@gmail.com',
      subject: `Nieuwe offerte-aanvraag van ${naam}`,
      html: `
        <h2>Nieuwe aanvraag via de website</h2>
        <p><strong>Naam:</strong> ${naam}</p>
        <p><strong>Telefoon:</strong> ${telefoon}</p>
        <p><strong>E-mail:</strong> ${email || 'Niet opgegeven'}</p>
        <hr />
        <p><strong>Beschrijving klus:</strong></p>
        <p>${bericht}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Er ging iets mis bij het verzenden.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
