// Where php-mailer/send.php is deployed. Vercel can't run PHP, so send.php
// lives on a separate PHP host - change this one line if it moves. Kept in
// its own file (no browser code) because next.config.ts imports it to allow
// this origin in the CSP's connect-src.
export const ENQUIRY_ENDPOINT = "https://mailer.secure-house.co.uk/send.php";
