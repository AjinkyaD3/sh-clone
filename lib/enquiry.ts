import { ENQUIRY_ENDPOINT } from "./enquiry-endpoint";

// Every form on the site submits through here to the single
// php-mailer/send.php endpoint. Besides the form's own fields, each lead
// carries the page it was sent from (URL + title), the referrer, and
// first-touch landing page/UTM params, so the lead email can show exactly
// where the enquiry came from. The formType must match a key in $FORMS in
// send.php.

export type EnquiryFormType = "contact" | "quote";

const ATTRIBUTION_KEY = "sh-attribution";
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;

type Attribution = {
  landingPage: string;
  referrer: string;
  utm: Partial<Record<(typeof UTM_KEYS)[number], string>>;
};

// Called once per page load (from the sitewide GetAQuote component).
// Remembers the first page and referrer of the visit, so a visitor who
// lands from an ad on /doors/ and then enquires from /contact-us/ is
// still attributed to the ad.
export function rememberAttribution() {
  try {
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Attribution["utm"] = {};
    for (const key of UTM_KEYS) {
      const value = params.get(`utm_${key}`);
      if (value) utm[key] = value;
    }
    const attribution: Attribution = {
      landingPage: window.location.href,
      referrer: document.referrer,
      utm,
    };
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Storage blocked (private mode etc.) - attribution is best-effort.
  }
}

function readAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

// Throws an Error with a user-facing message on failure.
export async function submitEnquiry(
  formType: EnquiryFormType,
  fields: Record<string, string | string[]>,
  honeypot = "",
): Promise<void> {
  const attribution = readAttribution();

  let res: Response;
  try {
    res = await fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType,
        fields,
        website: honeypot,
        page: {
          url: window.location.href,
          title: document.title,
          referrer: attribution?.referrer || document.referrer,
          landingPage: attribution?.landingPage || window.location.href,
          utm: attribution?.utm ?? {},
        },
      }),
    });
  } catch {
    throw new Error("Couldn't reach our server. Please check your connection and try again.");
  }

  let body: { ok?: boolean; error?: string } = {};
  try {
    body = await res.json();
  } catch {
    // Non-JSON error page from the host - fall through to generic message.
  }
  if (!res.ok || !body.ok) {
    throw new Error(body.error || "Something went wrong. Please try again or call us.");
  }
}
