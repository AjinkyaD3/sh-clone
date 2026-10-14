<?php
/**
 * Secure House: single lead endpoint for every form on the site.
 *
 * The Next.js site (hosted on Vercel, which can't run PHP) POSTs JSON here
 * from the browser via lib/enquiry.ts. Each form is described once in $FORMS
 * below. To add a new form, add an entry there and call submitEnquiry() with
 * the same formType from the React side.
 *
 * Request body (JSON):
 *   formType  "contact" | "quote" | ...
 *   fields    { fieldKey: value, ... }   (arrays allowed for checkbox lists)
 *   page      { url, title, referrer, landingPage, utm: {source, medium, campaign, term, content} }
 *   website   honeypot. Must be empty.
 *
 * Response: {"ok":true} or {"ok":false,"error":"..."} with a 4xx/5xx status.
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailerException;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

$config = require __DIR__ . '/config.php';
date_default_timezone_set($config['timezone']);

// ---------------------------------------------------------------------------
// Form definitions. Field order here is the row order in the email.
// ---------------------------------------------------------------------------
$FORMS = [
    'contact' => [
        'name'  => 'Contact Us Form',
        'badge' => 'New Contact Enquiry',
        'fields' => [
            'name'    => ['label' => 'Name',          'required' => true],
            'email'   => ['label' => 'Email',         'required' => true, 'type' => 'email'],
            'phone'   => ['label' => 'Phone',         'required' => true, 'type' => 'phone'],
            'message' => ['label' => 'Message',       'required' => false, 'type' => 'multiline'],
        ],
    ],
    'quote' => [
        'name'  => 'Get a Quote Form',
        'badge' => 'New Quote Request',
        'fields' => [
            'name'      => ['label' => 'Name',             'required' => true],
            'email'     => ['label' => 'Email',            'required' => true, 'type' => 'email'],
            'phone'     => ['label' => 'Phone',            'required' => true, 'type' => 'phone'],
            'address'   => ['label' => 'Postal Address',   'required' => true],
            'interests' => ['label' => 'Interested In',    'required' => false, 'type' => 'list'],
            'enquiry'   => ['label' => 'Enquiry',          'required' => true, 'type' => 'multiline'],
        ],
    ],
];

// ---------------------------------------------------------------------------
// HTTP plumbing
// ---------------------------------------------------------------------------
function respond($status, array $body)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body);
    exit;
}

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin !== '' && in_array($origin, $config['allowed_origins'], true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}
header('X-Content-Type-Options: nosniff');

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($method !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}
if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) {
    respond(403, ['ok' => false, 'error' => 'Origin not allowed.']);
}

$raw = file_get_contents('php://input');
if (strlen($raw) > 64000) {
    respond(413, ['ok' => false, 'error' => 'Request too large.']);
}
$input = json_decode($raw, true);
if (!is_array($input)) {
    // Also accept a classic form POST, so a plain <form action="send.php">
    // works too.
    $input = $_POST;
}

// Honeypot: real visitors never see or fill this field. Pretend success so
// bots don't retry.
if (!empty($input['website'])) {
    respond(200, ['ok' => true]);
}

$formType = isset($input['formType']) ? (string) $input['formType'] : '';
if (!isset($FORMS[$formType])) {
    respond(400, ['ok' => false, 'error' => 'Unknown form.']);
}
$form = $FORMS[$formType];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function clean_text($value, $max, $multiline = false)
{
    if (!is_scalar($value)) {
        return '';
    }
    $value = (string) $value;
    if (function_exists('mb_check_encoding') && !mb_check_encoding($value, 'UTF-8')) {
        $value = utf8_encode_fallback($value);
    }
    // Strip control characters (keep newlines/tabs in multiline fields).
    $value = $multiline
        ? preg_replace('/[^\P{C}\n\t]/u', '', str_replace("\r\n", "\n", $value))
        : preg_replace('/\p{C}+/u', ' ', $value);
    $value = trim((string) $value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max, 'UTF-8');
    }
    return substr($value, 0, $max);
}

function utf8_encode_fallback($value)
{
    return function_exists('mb_convert_encoding')
        ? mb_convert_encoding($value, 'UTF-8', 'ISO-8859-1')
        : $value;
}

function clean_url($value)
{
    $value = clean_text($value, 2000);
    if ($value === '' || !preg_match('#^https?://#i', $value)) {
        return '';
    }
    return filter_var($value, FILTER_VALIDATE_URL) ? $value : '';
}

function e($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** "/doors/high-security-doors/" -> "Doors › High Security Doors" */
function page_name_from_url($url)
{
    $path = trim((string) parse_url($url, PHP_URL_PATH), '/');
    if ($path === '') {
        return 'Home';
    }
    $parts = array_map(function ($segment) {
        return ucwords(str_replace(['-', '_'], ' ', urldecode($segment)));
    }, explode('/', $path));
    return implode(' › ', $parts);
}

function client_ip()
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = trim(explode(',', $_SERVER[$key])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return 'unknown';
}

function describe_device($ua)
{
    if ($ua === '') {
        return '';
    }
    $device = preg_match('/iPad|Tablet/i', $ua) ? 'Tablet'
        : (preg_match('/Mobi|Android|iPhone/i', $ua) ? 'Mobile' : 'Desktop');
    $os = 'Unknown OS';
    foreach ([
        'iPhone|iPad|iOS' => 'iOS', 'Android' => 'Android', 'Windows' => 'Windows',
        'Mac OS X|Macintosh' => 'macOS', 'CrOS' => 'ChromeOS', 'Linux' => 'Linux',
    ] as $pattern => $name) {
        if (preg_match('/' . $pattern . '/i', $ua)) {
            $os = $name;
            break;
        }
    }
    $browser = 'Unknown browser';
    foreach ([
        'Edg/' => 'Edge', 'OPR/|Opera' => 'Opera', 'SamsungBrowser' => 'Samsung Internet',
        'Firefox/|FxiOS' => 'Firefox', 'Chrome/|CriOS' => 'Chrome', 'Safari/' => 'Safari',
    ] as $pattern => $name) {
        if (preg_match('#' . $pattern . '#i', $ua)) {
            $browser = $name;
            break;
        }
    }
    return $device . ' · ' . $os . ' · ' . $browser;
}

function rate_limited($ip, array $limit)
{
    $file = rtrim(sys_get_temp_dir(), '/\\') . '/sh-mailer-' . sha1($ip) . '.json';
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = json_decode((string) @file_get_contents($file), true);
        $hits = is_array($hits) ? $hits : [];
    }
    $hits = array_values(array_filter($hits, function ($t) use ($now, $limit) {
        return is_int($t) && $t > $now - $limit['window'];
    }));
    if (count($hits) >= $limit['max']) {
        return true;
    }
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

// ---------------------------------------------------------------------------
// Validate + collect fields
// ---------------------------------------------------------------------------
$rawFields = isset($input['fields']) && is_array($input['fields']) ? $input['fields'] : $input;
$values = [];
foreach ($form['fields'] as $key => $def) {
    $type = isset($def['type']) ? $def['type'] : 'text';
    $raw = isset($rawFields[$key]) ? $rawFields[$key] : '';

    if ($type === 'list') {
        $items = is_array($raw) ? $raw : ($raw === '' ? [] : [$raw]);
        $items = array_values(array_filter(array_map(function ($v) {
            return clean_text($v, 100);
        }, array_slice($items, 0, 20)), 'strlen'));
        $value = $items;
        $empty = count($items) === 0;
    } else {
        $value = clean_text($raw, $type === 'multiline' ? 5000 : 300, $type === 'multiline');
        $empty = $value === '';
    }

    if ($empty && !empty($def['required'])) {
        respond(422, ['ok' => false, 'error' => $def['label'] . ' is required.']);
    }
    if (!$empty && $type === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
        respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
    }
    if (!$empty && $type === 'phone' && !preg_match('/^[0-9 +().\-\/]{6,30}$/', $value)) {
        respond(422, ['ok' => false, 'error' => 'Please enter a valid phone number.']);
    }
    $values[$key] = $value;
}

$ip = client_ip();
if (rate_limited($ip, $config['rate_limit'])) {
    respond(429, ['ok' => false, 'error' => 'Too many submissions. Please try again in a few minutes, or call us.']);
}

// ---------------------------------------------------------------------------
// Lead source (which page the lead came from)
// ---------------------------------------------------------------------------
$page = isset($input['page']) && is_array($input['page']) ? $input['page'] : [];
$pageUrl = clean_url(isset($page['url']) ? $page['url'] : '');
if ($pageUrl === '' && !empty($_SERVER['HTTP_REFERER'])) {
    $pageUrl = clean_url($_SERVER['HTTP_REFERER']);
}
$pageTitle = clean_text(isset($page['title']) ? $page['title'] : '', 200);
// Page titles look like "High Security Doors | Secure House". Keep the
// meaningful part.
$pageTitle = trim(preg_replace('/\s*[|\-–—]\s*Secure House.*$/iu', '', $pageTitle));
$pageName = $pageUrl !== '' ? page_name_from_url($pageUrl) : 'Unknown page';
$pagePath = $pageUrl !== '' ? (parse_url($pageUrl, PHP_URL_PATH) ?: '/') : '';
$referrer = clean_url(isset($page['referrer']) ? $page['referrer'] : '');
$landingPage = clean_url(isset($page['landingPage']) ? $page['landingPage'] : '');

$utm = [];
if (isset($page['utm']) && is_array($page['utm'])) {
    foreach (['source', 'medium', 'campaign', 'term', 'content'] as $k) {
        $v = clean_text(isset($page['utm'][$k]) ? $page['utm'][$k] : '', 150);
        if ($v !== '') {
            $utm[$k] = $v;
        }
    }
}

$userAgent = clean_text(isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '', 400);
$submittedAt = date('l, j F Y \a\t H:i T');
$name = $values['name'];
$email = $values['email'];
$phone = $values['phone'];
$headline = $pageTitle !== '' ? $pageTitle : $pageName;

// ---------------------------------------------------------------------------
// Build email
// ---------------------------------------------------------------------------
$subject = sprintf('%s from %s | %s', $form['badge'], $name, $headline);
$subject = preg_replace('/[\r\n]+/', ' ', $subject);

$navy = '#1c1e36';
$cream = '#f5efe9';
$sand = '#e1d8c0';
$taupe = '#847b73';
$ink = '#2b2b33';
$muted = '#6f6a64';
$line = '#e8e1d7';

$hasLogo = is_file(__DIR__ . '/logo.png');
$logoHtml = $hasLogo
    ? '<img src="cid:shlogo" width="200" alt="Secure House" style="display:block;width:200px;max-width:100%;height:auto;border:0;">'
    : '<span style="font-family:Georgia,serif;font-size:26px;color:#ffffff;letter-spacing:1px;">SECURE HOUSE</span>';

// One table row per field. On phones the label/value cells stack (see the
// .stack rule in <style>).
$detailRows = '';
foreach ($form['fields'] as $key => $def) {
    $type = isset($def['type']) ? $def['type'] : 'text';
    $value = $values[$key];
    if ($type === 'list') {
        if (!$value) {
            $cell = '<span style="color:' . $muted . ';">None selected</span>';
        } else {
            $cell = '';
            foreach ($value as $item) {
                $cell .= '<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 12px;background:' . $cream
                    . ';border:1px solid ' . $sand . ';border-radius:999px;font-size:13px;color:' . $navy . ';">' . e($item) . '</span>';
            }
        }
    } elseif ($value === '') {
        $cell = '<span style="color:' . $muted . ';">Not provided</span>';
    } elseif ($type === 'email') {
        $cell = '<a href="mailto:' . e($value) . '" style="color:' . $navy . ';font-weight:600;text-decoration:underline;word-break:break-all;">' . e($value) . '</a>';
    } elseif ($type === 'phone') {
        $tel = preg_replace('/[^0-9+]/', '', $value);
        $cell = '<a href="tel:' . e($tel) . '" style="color:' . $navy . ';font-weight:600;text-decoration:underline;">' . e($value) . '</a>';
    } elseif ($type === 'multiline') {
        $cell = '<div style="white-space:pre-wrap;line-height:1.6;">' . nl2br(e($value), false) . '</div>';
    } else {
        $cell = e($value);
    }

    $detailRows .= '<tr>'
        . '<td class="stack label" width="34%" valign="top" style="padding:14px 16px;border-bottom:1px solid ' . $line . ';background:#faf7f3;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:' . $taupe . ';">' . e($def['label']) . '</td>'
        . '<td class="stack value" valign="top" style="padding:14px 16px;border-bottom:1px solid ' . $line . ';font-size:15px;color:' . $ink . ';word-break:break-word;">' . $cell . '</td>'
        . '</tr>';
}

function info_row($label, $valueHtml, $line, $taupe, $ink)
{
    return '<tr>'
        . '<td class="stack label" width="34%" valign="top" style="padding:10px 16px;border-bottom:1px solid ' . $line . ';font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:' . $taupe . ';">' . e($label) . '</td>'
        . '<td class="stack value" valign="top" style="padding:10px 16px;border-bottom:1px solid ' . $line . ';font-size:14px;color:' . $ink . ';word-break:break-word;">' . $valueHtml . '</td>'
        . '</tr>';
}

function link_html($url, $color)
{
    return '<a href="' . e($url) . '" style="color:' . $color . ';text-decoration:underline;word-break:break-all;">' . e($url) . '</a>';
}

$sourceRows = info_row('Page', '<strong>' . e($headline) . '</strong>', $line, $taupe, $ink)
    . ($pageUrl !== '' ? info_row('Page URL', link_html($pageUrl, $navy), $line, $taupe, $ink) : '')
    . info_row('Form', e($form['name']), $line, $taupe, $ink)
    . info_row('Submitted', e($submittedAt), $line, $taupe, $ink);

$trackingRows = '';
if ($landingPage !== '' && $landingPage !== $pageUrl) {
    $trackingRows .= info_row('Landing page', link_html($landingPage, $navy), $line, $taupe, $ink);
}
$trackingRows .= info_row('Came from', $referrer !== '' ? link_html($referrer, $navy) : 'Direct / unknown', $line, $taupe, $ink);
if ($utm) {
    $utmText = [];
    foreach ($utm as $k => $v) {
        $utmText[] = '<span style="color:' . $muted . ';">' . e($k) . ':</span> ' . e($v);
    }
    $trackingRows .= info_row('Campaign (UTM)', implode('<br>', $utmText), $line, $taupe, $ink);
}
if ($userAgent !== '') {
    $trackingRows .= info_row('Device', e(describe_device($userAgent)), $line, $taupe, $ink);
}
$trackingRows .= info_row('IP address', e($ip), $line, $taupe, $ink);

$replySubject = rawurlencode('Re: Your enquiry with Secure House');
$telHref = preg_replace('/[^0-9+]/', '', $phone);
$firstName = explode(' ', $name)[0];

$html = '<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<title>' . e($subject) . '</title>
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse; }
  a { color:' . $navy . '; }
  @media only screen and (max-width:620px) {
    .container { width:100% !important; }
    .px { padding-left:18px !important; padding-right:18px !important; }
    .stack { display:block !important; width:100% !important; box-sizing:border-box; }
    .label { border-bottom:0 !important; padding-bottom:2px !important; background:transparent !important; }
    .value { padding-top:2px !important; }
    .btn { display:block !important; width:100% !important; margin:0 0 10px 0 !important; }
    .btn a { display:block !important; }
    .h1 { font-size:24px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#efe9e1;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">'
    . e($form['badge'] . ' from ' . $name . ' via ' . $headline) . '</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#efe9e1;">
<tr><td align="center" style="padding:28px 12px;">

  <table role="presentation" class="container" width="620" cellpadding="0" cellspacing="0" border="0" style="width:620px;max-width:620px;background:#ffffff;border-radius:10px;overflow:hidden;font-family:\'Segoe UI\',Helvetica,Arial,sans-serif;box-shadow:0 2px 10px rgba(28,30,54,.08);">

    <!-- Header -->
    <tr><td class="px" style="background:' . $navy . ';padding:28px 32px 26px;" align="left">
      ' . $logoHtml . '
    </td></tr>
    <tr><td style="height:4px;background:' . $sand . ';line-height:4px;font-size:0;">&nbsp;</td></tr>

    <!-- Title -->
    <tr><td class="px" style="padding:30px 32px 6px;">
      <span style="display:inline-block;padding:6px 12px;border-radius:4px;background:' . $cream . ';border:1px solid ' . $sand . ';font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:' . $navy . ';">' . e($form['badge']) . '</span>
      <h1 class="h1" style="margin:16px 0 6px;font-family:Georgia,\'Times New Roman\',serif;font-weight:400;font-size:28px;line-height:1.25;color:' . $navy . ';">' . e($name) . ' wants to hear from you</h1>
      <p style="margin:0;font-size:15px;line-height:1.6;color:' . $muted . ';">Submitted from <strong style="color:' . $ink . ';">' . e($headline) . '</strong> on ' . e($submittedAt) . '.</p>
    </td></tr>

    <!-- Quick actions -->
    <tr><td class="px" style="padding:22px 32px 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td class="btn" style="padding-right:10px;" width="50%">
          <a href="mailto:' . e($email) . '?subject=' . $replySubject . '" style="display:block;text-align:center;background:' . $navy . ';color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;letter-spacing:.04em;padding:14px 18px;border-radius:6px;">&#9993;&nbsp; Reply to ' . e($firstName) . '</a>
        </td>
        <td class="btn" width="50%">
          <a href="tel:' . e($telHref) . '" style="display:block;text-align:center;background:#ffffff;color:' . $navy . ';text-decoration:none;font-weight:600;font-size:14px;letter-spacing:.04em;padding:13px 18px;border-radius:6px;border:1px solid ' . $navy . ';">&#9742;&nbsp; Call ' . e($phone) . '</a>
        </td>
      </tr></table>
    </td></tr>

    <!-- Lead source -->
    <tr><td class="px" style="padding:26px 32px 0;">
      <h2 style="margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:' . $navy . ';">&#128205; Lead Source</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $cream . ';border:1px solid ' . $sand . ';border-left:4px solid ' . $navy . ';border-radius:6px;">
        ' . $sourceRows . '
      </table>
    </td></tr>

    <!-- Customer details -->
    <tr><td class="px" style="padding:26px 32px 0;">
      <h2 style="margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:' . $navy . ';">&#128100; Enquiry Details</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $line . ';border-radius:6px;border-collapse:separate;overflow:hidden;">
        ' . $detailRows . '
      </table>
    </td></tr>

    <!-- Tracking -->
    <tr><td class="px" style="padding:26px 32px 30px;">
      <h2 style="margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:' . $navy . ';">&#128269; Visitor Info</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $line . ';border-radius:6px;">
        ' . $trackingRows . '
      </table>
    </td></tr>

    <!-- Footer -->
    <tr><td class="px" style="background:' . $navy . ';padding:22px 32px;" align="center">
      <p style="margin:0 0 4px;font-size:13px;color:' . $sand . ';">Hit <strong>Reply</strong> to answer ' . e($firstName) . ' directly at ' . e($email) . '.</p>
      <p style="margin:0;font-size:12px;color:#9a96a8;">Sent automatically by the Secure House website &middot; secure-house.co.uk</p>
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>';

// Plain-text version for clients that don't render HTML.
$text = strtoupper($form['badge']) . "\n" . str_repeat('=', 40) . "\n\n";
$text .= "LEAD SOURCE\n";
$text .= "Page:       {$headline}\n";
if ($pageUrl !== '') {
    $text .= "Page URL:   {$pageUrl}\n";
}
$text .= "Form:       {$form['name']}\n";
$text .= "Submitted:  {$submittedAt}\n\n";
$text .= "ENQUIRY DETAILS\n";
foreach ($form['fields'] as $key => $def) {
    $v = $values[$key];
    $v = is_array($v) ? ($v ? implode(', ', $v) : 'None selected') : ($v === '' ? 'Not provided' : $v);
    $text .= str_pad($def['label'] . ':', 16) . (strpos($v, "\n") !== false ? "\n" . $v : $v) . "\n";
}
$text .= "\nVISITOR INFO\n";
if ($landingPage !== '' && $landingPage !== $pageUrl) {
    $text .= "Landing page: {$landingPage}\n";
}
$text .= 'Came from:    ' . ($referrer !== '' ? $referrer : 'Direct / unknown') . "\n";
foreach ($utm as $k => $v) {
    $text .= "utm_{$k}: {$v}\n";
}
$text .= 'IP address:   ' . $ip . "\n";

// ---------------------------------------------------------------------------
// Send
// ---------------------------------------------------------------------------
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $config['smtp']['host'];
    $mail->Port = (int) $config['smtp']['port'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp']['username'];
    $mail->Password = str_replace(' ', '', $config['smtp']['password']);
    $mail->SMTPSecure = $config['smtp']['secure'] === 'ssl'
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Encoding = PHPMailer::ENCODING_QUOTED_PRINTABLE;
    $mail->Timeout = 20;

    $mail->setFrom($config['from_email'], $config['from_name']);
    foreach ($config['to'] as $address => $label) {
        $mail->addAddress($address, $label);
    }
    foreach ($config['bcc'] as $address) {
        $mail->addBCC($address);
    }
    $mail->addReplyTo($email, $name);

    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $html;
    $mail->AltBody = $text;
    if ($hasLogo) {
        $mail->addEmbeddedImage(__DIR__ . '/logo.png', 'shlogo', 'secure-house-logo.png');
    }

    $mail->send();
} catch (MailerException $ex) {
    error_log('[secure-house send.php] Mail failed: ' . $mail->ErrorInfo);
    respond(500, ['ok' => false, 'error' => 'Sorry, we couldn\'t send your message right now. Please try again or call us.']);
}

respond(200, ['ok' => true]);
