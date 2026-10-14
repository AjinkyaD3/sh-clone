# Secure House lead mailer (`send.php`)

One PHP endpoint handles every form on the site. It sends through Gmail SMTP using PHPMailer 7.1.1.

The Next.js site runs on Vercel, which **can't run PHP**, so this folder goes on a separate PHP host (cPanel, Hostinger and similar). The browser posts the forms to it directly.

## What each lead email contains

- **Lead Source:** the page the form was sent from (title + URL), which form it was, and the date/time (UK time).
- **Enquiry Details:** every form field in a table. Email and phone are clickable, and the label/value rows stack on mobile.
- **Visitor Info:** the visit's landing page, where the visitor came from (Google, etc.), UTM campaign tags, device/browser and IP.
- One-tap **Reply** and **Call** buttons. Pressing Reply goes straight to the customer.

## Recipients

| Header | Address |
|---|---|
| To (only visible address) | info@secure-house.co.uk |
| Bcc (hidden) | pallavi.p@brainminetech.com, priyanka.s@brainminetech.com, gaurav.b@brainminetech.com |
| Reply-To | the customer's email |

You can change these in `config.php`.

## Deploy

1. Upload this whole folder (including `config.php`, `logo.png`, `PHPMailer/` and `.htaccess`) to the PHP host, for example as `https://mailer.secure-house.co.uk/send.php`. PHP 7.4+ with the `openssl` extension is required (standard on shared hosting).
2. Put that exact URL in `lib/enquiry-endpoint.ts` in the Next.js project and redeploy on Vercel. The CSP in `next.config.ts` picks it up automatically.
3. Make sure the site's live domain(s) are listed in `allowed_origins` in `config.php`. Add any Vercel preview domain there too if forms should work on previews.

`config.php` contains the Gmail app password, so it is gitignored. Keep your local copy, and use `config.example.php` as the template.

## Adding another form

1. Add an entry to `$FORMS` at the top of `send.php` with the field keys and labels.
2. On the React side, call `submitEnquiry("<formType>", { ...fields })` from `lib/enquiry.ts` (add the new type to `EnquiryFormType`).

## Spam and abuse protection

- A hidden honeypot field (`website`)
- Origin allow-list (CORS)
- Per-IP limit: 5 submissions per 10 minutes
- Server-side validation and length limits on every field
- All user input HTML-escaped in the email
