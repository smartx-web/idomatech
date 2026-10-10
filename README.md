# Idoma Tech Community

A responsive community website with leadership profiles, objectives, events, calendar downloads, searchable publications, media galleries, membership enquiries and a protected content studio.

## Run and build

The app is a dependency-free Cloudflare Worker. `bash scripts/build.sh` builds it, and `node scripts/validate-artifact.mjs` validates the artifact. Deploy the Worker with an R2 binding named `BUCKET`. Site hosting configuration is in `.openai/hosting.json`.

## Content administration

Open **Admin** at the bottom of the website while signed in with ChatGPT. Add or edit publications, leadership, events, media and community information; posts support drafts. Enquiries are visible only in the admin area. Photos and videos use HTTPS URLs; portrait placeholders do not imply real photographs.

Content is stored in R2 at `community/content.json`; enquiries are stored separately under `enquiries/`. Edits use ETag checks to prevent overwriting concurrent changes. Seed copy and proposed activities should be approved by ITC.

## Access and publication

The Site is public. Content administration requires ChatGPT sign-in and a server-side email allowlist configured through `ADMIN_EMAILS`. No shared password is embedded in the website. Trusted identity headers must come from Sites dispatch. Admin photo uploads support JPEG, PNG and WebP up to 5 MB and are stored in R2. Public enquiry submissions include a honeypot and a per-IP cooldown; this is basic abuse protection, not a full CAPTCHA service.

## Content to supply

Confirmed executive, trustee and patron appointments; approved objectives and vision; real portraits and media URLs; community contact channels. No patron or trustee appointment is assumed. No automatic email delivery is configured.


## Render hosting

Render runs `npm start` with Node 22 or newer. Build: `npm run build && npm run validate`. The server binds `0.0.0.0:$PORT`; `/health` is its health endpoint. `CONTENT_ORIGIN` points to the existing public Sites publication. Render serves the application HTML from this repository and forwards public content, media and enquiries to the existing persistent service. Admin opens that service’s protected editing area; ChatGPT authentication remains there. Keep the content service live and public. This is a connected Render frontend, not a migration of stored content or administrator authentication.
