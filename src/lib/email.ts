import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock');

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('MOCK EMAIL SEND:', { to, subject, html });
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'DOGSPA <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}
