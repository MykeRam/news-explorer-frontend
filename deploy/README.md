# Google Cloud deployment

Target frontend: `https://news-explorer-mykeram.mooo.com` (DNS and deployment pending).
Backend: `https://api.news-explorer-mykeram.mooo.com`.

Use the existing VM in project `news-explorer-511715`, zone `us-central1-a`, instance `instance-20261017-230220`. Keep frontend work on `stage-3-frontend-auth` until instructor approval.

## Build locally

From the frontend review branch, install with `npm ci`, then run `npm run lint` and `npm run build`. Supply `VITE_NEWS_API_KEY` through the local environment. `VITE_MAIN_API_URL` defaults to the deployed API. Vite variables are included in the browser bundle; never supply backend secrets.

Upload only the contents of `dist/` to a new release directory under `/var/www/news-explorer-frontend/releases/`. Do not upload environment files, source checkouts, or node_modules. Point `/var/www/news-explorer-frontend/current` at the verified release. Keep the previous release to allow rollback.

## DNS, Nginx, and HTTPS

1. Confirm the VM external IP in Google Cloud. Create an A record for `news-explorer-mykeram.mooo.com` pointing at that IP (currently `35.208.230.37`). Leave the existing API record in place.
2. Copy `nginx.conf` to `/etc/nginx/sites-available/news-explorer-frontend` and enable it with a symlink in `/etc/nginx/sites-enabled/`. Preserve the API site. Run `sudo nginx -t` before `sudo systemctl reload nginx`.
3. Confirm authoritative DNS returns the VM IP and HTTP serves the frontend. Then run `sudo certbot --nginx -d news-explorer-mykeram.mooo.com --redirect`. Review any account or terms prompts interactively.
4. Run `sudo certbot renew --dry-run` and check HTTP redirects to HTTPS. Keep Certbot's resulting TLS configuration on the VM; do not overwrite it with the initial HTTP template on later releases.

The Nginx SPA fallback serves `/saved-news` directly. Hashed assets are cached; index.html is revalidated so new releases can load new asset filenames.

## Backend CORS

Add `https://news-explorer-mykeram.mooo.com` to the backend's existing comma-separated `CORS_ALLOWED_ORIGINS` in its VM environment, preserving the other allowed origins. Restart `news-explorer` and verify a preflight with this exact Origin returns Access-Control-Allow-Origin.

Do not reinstall the backend dependencies from an older lockfile: the VM has a body-parser security patch, while backend PR #3 remains open. Deploy that dependency update separately after its review.

## Acceptance checks

- Confirm the production bundle loads without console errors and searches return real news.
- Register, sign in, refresh, sign out, and retry invalid credentials or temporary failures.
- Open `/saved-news` directly while signed out, while restoring a valid session, and with an expired token. Check browser Back and Forward navigation.
- Save and delete articles; refresh and verify persistence, counts, ranked keywords, account isolation, and duplicate-request protection.
- Check desktop and mobile layouts, modal validation, keyboard focus, empty results, and API errors.
- Update the root README with the live frontend URL only after HTTPS and these checks pass. Submit the frontend pull-request URL; merge after instructor approval.

For later frontend releases, replace the current symlink with the new verified release and keep the existing Nginx TLS and backend configuration. Roll back by pointing the symlink at the previous release.
