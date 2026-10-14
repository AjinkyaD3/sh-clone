<?php
// Secure House lead mailer: private settings.
// Copy this file to config.php and fill in the real values.

return [
    // Gmail SMTP. "password" is a Google App Password (Google account ->
    // Security -> 2-Step Verification -> App passwords), NOT the normal
    // Gmail login password. Spaces in the app password don't matter.
    'smtp' => [
        'host'     => 'smtp.gmail.com',
        'port'     => 587,
        'secure'   => 'tls',
        'username' => 'your-account@gmail.com',
        'password' => 'your-16-char-app-password',
    ],

    // Gmail always sends "From" the authenticated account; only the display
    // name is ours to choose.
    'from_email' => 'your-account@gmail.com',
    'from_name'  => 'Secure House Website',

    // The only visible recipient on every lead email.
    'to' => [
        'info@secure-house.co.uk' => 'Secure House',
    ],

    // Hidden copies. BCC recipients never appear in any header the other
    // recipients can see.
    'bcc' => [
        'pallavi.p@brainminetech.com',
        'priyanka.s@brainminetech.com',
        'gaurav.b@brainminetech.com',
    ],

    // Sites allowed to call send.php from the browser (CORS). Add the
    // Vercel preview domain here if you want forms to work on previews too.
    'allowed_origins' => [
        'https://secure-house.co.uk',
        'https://www.secure-house.co.uk',
        'http://localhost:3000',
    ],

    // Basic flood protection: at most `max` submissions per IP per `window`
    // seconds.
    'rate_limit' => [
        'max'    => 5,
        'window' => 600,
    ],

    'timezone' => 'Europe/London',
];
