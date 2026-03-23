import { v } from 'convex/values';
import { action, internalQuery } from './_generated/server';
import { api, internal } from './_generated/api';

export const sendRsvpEmail = action({
  args: {
    submissionId: v.id('submissions'),
  },
  handler: async (ctx, args) => {
    // 1. Fetch submission and event data
    const submission = await ctx.runQuery(internal.email.getSubmissionData, {
      submissionId: args.submissionId,
    });

    if (!submission || !submission.event) {
      console.error('Submission or Event not found');
      return;
    }

    const { event, answers } = submission;
    
    // 2. Identify recipient email
    // Try 'email' ID first, then search question text
    let recipientEmail = answers['email'];
    if (!recipientEmail) {
      const emailQuestion = event.form.questions.find((q: any) => 
        q.text.toLowerCase().includes('email')
      );
      if (emailQuestion) {
        recipientEmail = answers[emailQuestion.id];
      }
    }

    if (!recipientEmail) {
      console.error('No recipient email found in submission answers');
      return;
    }

    // 3. Generate QR Code URL
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${args.submissionId}&size=400x400`;

    // 4. Construct HTML Email Template
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Cinzel:wght@400;700&family=Newsreader:ital,wght@1,400;1,700&display=swap');
            body { 
              margin: 0; 
              padding: 0; 
              background-color: #0D0D0D; 
              color: #E8E4DC; 
              font-family: 'Inter', sans-serif;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 40px 20px;
              background-color: #0D0D0D;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .event-name {
              font-family: 'Cinzel', serif;
              font-size: 14px;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: #E8E4DC;
              opacity: 0.6;
            }
            .congrats {
              font-family: 'Newsreader', serif;
              font-style: italic;
              font-size: 32px;
              margin: 20px 0;
              color: #E8E4DC;
            }
            .details {
              border-top: 1px solid rgba(232, 228, 220, 0.1);
              border-bottom: 1px solid rgba(232, 228, 220, 0.1);
              padding: 30px 0;
              margin: 30px 0;
            }
            .detail-item {
              margin-bottom: 15px;
            }
            .detail-label {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #D1CDD2;
              opacity: 0.5;
            }
            .detail-value {
              font-size: 18px;
              font-family: 'Newsreader', serif;
              font-style: italic;
              color: #E8E4DC;
            }
            .qr-section {
              text-align: center;
              padding: 40px;
              background-color: #131313;
              border-radius: 4px;
            }
            .qr-code {
              width: 200px;
              height: 200px;
              background-color: white;
              padding: 10px;
              border-radius: 4px;
            }
            .qr-help {
              margin-top: 20px;
              font-size: 12px;
              color: #D1CDD2;
              opacity: 0.6;
            }
            .footer {
              text-align: center;
              margin-top: 60px;
              padding-top: 30px;
              border-top: 1px solid rgba(232, 228, 220, 0.1);
            }
            .brand {
              font-family: 'Cinzel', serif;
              font-size: 10px;
              letter-spacing: 0.2em;
              color: #E8E4DC;
              opacity: 0.3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="event-name">${event.content.eventName}</div>
              <h1 class="congrats">Congratulations!</h1>
              <p style="color: #D1CDD2; opacity: 0.8;">Your ticket for ${event.content.heading} is confirmed.</p>
            </div>

            <div class="details">
              <div class="detail-item">
                <div class="detail-label">When</div>
                <div class="detail-value">${event.date} at ${event.time}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Where</div>
                <div class="detail-value">${event.location}</div>
              </div>
            </div>

            <div class="qr-section">
              <img src="${qrCodeUrl}" alt="Access Ticket QR Code" class="qr-code" />
              <div class="qr-help">Please present this QR code at the entrance for seamless access.</div>
            </div>

            <div class="footer">
              <div class="brand">EVNETY <span style="font-style: normal; font-family: sans-serif; opacity: 0.6;">by</span> WEBBINGSTONE</div>
            </div>
          </div>
        </body>
      </html>
    `;

    // 5. Send via ZeptoMail
    const url = process.env.ZOHO_ZEPTOMAIL_URL!;
    const token = process.env.ZOHO_ZEPTOMAIL_TOKEN!;
    const fromEmail = process.env.ZOHO_SENDER_EMAIL!;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        from: { address: fromEmail, name: 'EVNETY' },
        to: [{ email_address: { address: recipientEmail } }],
        subject: `Your RSVP to ${event.content.eventName} is Confirmed`,
        htmlbody: htmlBody,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('ZeptoMail Error:', error);
      throw new Error(`Failed to send email: ${error}`);
    }

    console.log(`RSVP confirmation email sent to ${recipientEmail}`);
  },
});

export const sendBroadcastEmail = action({
  args: {
    eventId: v.id('events'),
    subject: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const data = await ctx.runQuery(internal.email.getEventEmails, {
      eventId: args.eventId,
    });

    if (!data || data.emails.length === 0) {
      console.log('No recipients found for broadcast');
      return;
    }

    const { emails, eventName } = data;
    const url = process.env.ZOHO_ZEPTOMAIL_URL!;
    const token = process.env.ZOHO_ZEPTOMAIL_TOKEN!;
    const fromEmail = process.env.ZOHO_SENDER_EMAIL!;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; background-color: #0D0D0D; color: #E8E4DC; padding: 40px; }
            .content { max-width: 600px; margin: 0 auto; line-height: 1.6; }
            .header { font-family: serif; font-style: italic; font-size: 24px; margin-bottom: 20px; }
            .footer { margin-top: 40px; font-size: 12px; opacity: 0.5; }
          </style>
        </head>
        <body>
          <div class="content">
            <div class="header">${eventName}</div>
            <div>${args.body.replace(/\n/g, '<br/>')}</div>
            <div class="footer">Sent via EVNETY — The Digital Curator</div>
          </div>
        </body>
      </html>
    `;

    // Process in batches of 50 to avoid timeouts/rate limits if needed, 
    // but for now we do one batch if possible or a loop.
    // ZeptoMail allows multiple recipients in one call.
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        from: { address: fromEmail, name: eventName },
        to: emails.map(email => ({ email_address: { address: email } })),
        subject: args.subject,
        htmlbody: htmlBody,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Broadcast failed: ${error}`);
    }

    console.log(`Broadcast sent to ${emails.length} recipients`);
  },
});

export const getSubmissionData = internalQuery({
  args: { submissionId: v.id('submissions') },
  handler: async (ctx, args) => {
    const submission = await ctx.db.get(args.submissionId);
    if (!submission) return null;
    const event = await ctx.db.get(submission.eventId);
    return { ...submission, event };
  },
});

export const getEventEmails = internalQuery({
  args: { eventId: v.id('events') },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) return null;

    const submissions = await ctx.db
      .query("submissions")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();

    const emails = submissions
      .map(s => s.answers.email)
      .filter(Boolean);

    return {
      emails,
      eventName: event.content?.eventName || event.routeName
    };
  },
});
