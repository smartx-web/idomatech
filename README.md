# Idoma Tech Community

A responsive community website with leadership profiles, objectives, events, calendar downloads, searchable publications, media galleries, membership enquiries and a protected content studio.

## Run and build

The app is a dependency-free Cloudflare Worker. `bash scripts/build.sh` builds it, and `node scripts/validate-artifact.mjs` validates the artifact. Deploy the Worker with an R2 binding named `BUCKET`. Site hosting configuration is in `.openai/hosting.json`.

## Content administration

Open **Admin** at the bottom of the website while signed in with ChatGPT. Add or edit publications, leadership, events, media and community information; posts support drafts. Enquiries are visible only in the admin area. Photos and videos use HTTPS URLs; portrait placeholders do not imply real photographs.

Content is stored in R2 at `community/content.json`; enquiries are stored separately under `enquiries/`. Edits use ETag checks to prevent overwriting concurrent changes. Seed copy and proposed activities should be approved by ITC.

## Access and publication

The initial Site is owner-private. `PRIVATE_ADMIN=1` enables content administration behind that owner-only hosting boundary. **Before changing hosting access to public or shared**, remove `PRIVATE_ADMIN` and set `ADMIN_EMAILS` to a comma-separated list of authorised ChatGPT sign-in emails. Never enable `PRIVATE_ADMIN` on a public/shared deployment. Public-facing deployment requires the platform's trusted identity headers; do not trust client-supplied identity headers on another host. Enquiries currently rely on the private Site access boundary; add abuse protection before public rollout.

## Content to supply

Confirmed executive, trustee and patron appointments; approved objectives and vision; real portraits and media URLs; community contact channels. No patron or trustee appointment is assumed. No automatic email delivery is configured.
