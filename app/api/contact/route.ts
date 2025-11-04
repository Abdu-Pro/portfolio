import { NextResponse } from 'next/server';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    console.log('API Key loaded:', apiKey ? 'Yes' : 'No');  // Log for debug

    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error - API key missing' }, { status: 500 });
    }

    // Dynamic import for Vercel
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, email, message } = result.data;

    // Use a verified sender - update with your email
    const { error } = await resend.emails.send({
      from: 'Abdurahman Portfolio <onboarding@resend.dev>',  // Test with this; verify domain later
      to: ['abduhuddien6306@gmail.com'],  // REPLACE with YOUR email (where messages go)
      subject: 'New Message from Abdurahman\'s Portfolio',
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log('Resend error:', error);  // Log for debug

    if (error) {
      return NextResponse.json({ error: `Email send failed: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message - server error' }, { status: 500 });
  }
}