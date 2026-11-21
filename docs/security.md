# Security

Security in Linkbase is handled in layers: secrets stay out of the codebase,
the browser is told how to treat our pages, abusive request volume is throttled,
and anything a user types is treated as untrusted on the way back out.

## Secrets & configuration

**Secrets live in environment variables, never in code or the repo.** API keys,
database URLs, and session secrets are read from the environment at runtime, so
no credential is ever committed or baked into a bundle.

- `.env.local` holds the real values for local development and is **gitignored**,
  so it can never be accidentally committed.
- `.env.example` is **checked in** as a template. It lists every variable the
  app expects — with placeholder or empty values, never real secrets — so a new
  developer knows exactly what to configure.

If a secret is ever committed by mistake, treat it as compromised: rotate the
value and scrub it from history rather than just deleting the line.

## Security headers

Response headers are set centrally in `next.config.js` so every route is covered
by default:

- **Content-Security-Policy (CSP)** — restricts which sources scripts, styles,
  and other resources may load from, limiting the blast radius of any injected
  markup.
- **X-Frame-Options** — blocks the site from being embedded in a frame,
  preventing clickjacking.
- **Referrer-Policy** — controls how much of the originating URL is sent on
  outbound navigation, avoiding leaks of internal paths or query parameters.

## Rate limiting

High-value and abusable endpoints are rate limited to stop abuse:

- **Sign-in attempts** are throttled to slow down credential-stuffing and
  brute-force attacks.
- **Link creation** is throttled to prevent spam and automated flooding of the
  system.

Limits are enforced on the server so they cannot be bypassed by a crafted client.

## Handling user-generated content

User-generated content — link URLs, titles, and anything else a user supplies —
is treated as untrusted:

- **Output is escaped on render.** Values are escaped when displayed so that a
  title or URL containing markup is shown as text and can never execute as HTML
  or script (defense against stored XSS).
- **Outbound links open with `rel="noopener noreferrer"`.** This severs the
  `window.opener` reference, so a destination page cannot navigate our tab
  (reverse tabnabbing), and withholds the referrer from the target.
