import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendPasswordReset(email: string, resetLink: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        // from: 'MangaSpot <noreply@mangaspot.com>',
        from: 'manga@shresthaprajwol.com.np',
        to: email,
        subject: 'Password Reset Request',
        html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
      <p style="color: #555; font-size: 16px;">
        Hi there,
      </p>
      <p style="color: #555; font-size: 16px; line-height: 1.5;">
        We received a request to reset your password. Click the button below to set a new password.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Reset Your Password
        </a>
      </div>
      <p style="color: #999; font-size: 14px;">
        This link will expire in <strong>15 minutes</strong>. If you did not request a password reset, you can safely ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #bbb; font-size: 12px; text-align: center;">
        &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>
    </div>
  </div>
`,
      });
      if (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send password reset email');
      }
      return data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send password reset email');
    }
  }
}
