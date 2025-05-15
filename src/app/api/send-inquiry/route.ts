import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import InquiryTemplate from '@/emails/inquiry-template';
import React from 'react';
//import ReactDOMServer from 'react-dom/server';

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, eventType, preferredDate, guests, additionalInfo } = await req.json();

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("RECIPIENT_EMAIL:", process.env.RECIPIENT_EMAIL);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
      <h2>You've received a new event inquiry!</h2>
      <p>Here are the details:</p>
      <ul>
        <li><strong>Full Name:</strong> ${fullName}</li>
        <li><strong>Email Address:</strong> ${email}</li>
        <li><strong>Phone Number:</strong> ${phone}</li>
        <li><strong>Event Type:</strong> ${eventType}</li>
        <li><strong>Preferred Date:</strong> ${preferredDate}</li>
        <li><strong>Number of Guests:</strong> ${guests}</li>
      </ul>
      <p><strong>Additional Information:</strong></p>
      <p>${additionalInfo}</p>
      <hr />
      <p>Please reach out to the client directly to follow up.</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "test@example.com",
      subject: `New Event Inquiry: ${fullName} is planning an event`,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending inquiry:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to send inquiry. Please try again later.' }, { status: 500 });
  }
}