# EmailJS Setup Instructions

To make the contact form functional, follow these steps:

## 1. Create EmailJS Account

- Go to [emailjs.com](https://emailjs.com)
- Sign up for a free account
- Verify your email address

## 2. Create Email Service

- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions for your provider
- Note down your **Service ID** == service_6qcgc43

## 3. Create Email Template

- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Use these template variables in your email template:
  - `{{from_name}}` - Sender's name
  - `{{from_email}}` - Sender's email
  - `{{message}}` - Message content
  - `{{to_name}}` - Your name (recipient)

Example template:

```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

Best regards,
Your Portfolio Website
```

- Save the template and note down your **Template ID**

## 4. Get Public Key

- Go to "Account" > "General"
- Find your **Public Key** (User ID)

## 5. Update the Code

Replace the placeholder values in `src/components/ContactForm.tsx`:

```typescript
const result = await emailjs.sendForm(
  "YOUR_SERVICE_ID", // Replace with your Service ID
  "YOUR_TEMPLATE_ID", // Replace with your Template ID
  form.current!,
  "YOUR_PUBLIC_KEY" // Replace with your Public Key
);
```

## 6. Test the Form

- Fill out the contact form on your website
- Check your email for the message
- Verify that all template variables are populated correctly

## 7. Remove Setup Notice

Once everything is working, remove the setup notice from the ContactForm component.

## Important Notes

- EmailJS free plan allows 200 emails per month
- Make sure your email service is properly configured
- Test thoroughly before going live
- Keep your credentials secure (consider using environment variables for production)
