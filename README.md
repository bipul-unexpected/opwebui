# OpeNpaTh website

Marketing site and download page for [OpeNpaTh](https://github.com/bipul-unexpected/OpeNpaTh). Built with TanStack Start, React, Vite and Tailwind CSS.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

For contact messages, obtain an access key from [Web3Forms](https://web3forms.com/), add `VITE_WEB3FORMS_ACCESS_KEY` to `.env.local` (or the deployment build environment), and restart/rebuild. The key is sent to browsers by design: never use it for a secret. Without a key the form is disabled and links to GitHub issues. Do not commit `.env.local`.

The download page checks the GitHub latest release API and links directly to verified repository assets. When the API cannot be reached or is rate limited, it uses the verified v1.1.0 asset list and directs users to GitHub for newer releases. Update the fallback when publishing a new stable release. Users should verify downloaded files using the release checksums.

```sh
npm run test
npm run build
# Preview the Cloudflare build locally (Wrangler required):
npx wrangler dev --config .output/server/wrangler.json --local
```

The existing `npm run preview` / Vite preview currently expects a different server output path and returns HTTP 500; use the Cloudflare worker preview above instead.

Before production: set the Web3Forms key in the hosting build environment and test delivery; configure the real site domain, canonical URLs, sitemap, social preview and search console after the domain is known. Search rankings cannot be guaranteed. Audit privacy/legal requirements for the deployment and review the product security model before publishing.
