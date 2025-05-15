/* eslint-disable no-console */
import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body as ContactForm;

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <admin@mamskie.me>',
      to: 'khotib.bul@gmail.com',
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <h3>You got a new message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error');
    }
    res.status(500).json({ error: 'Failed to send message' });
  }
}
