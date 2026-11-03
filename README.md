# OpeNpaTh AI Bridge — Local Automation Runner website

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

## Search and production checklist

The public domain is `https://openpath.biz.id`. The home and download pages have canonical URLs and social metadata; `public/robots.txt`, `public/sitemap.xml`, and `public/og-banner.jpg` are served from the site root. Update the sitemap when public pages change and keep the structured data accurate. After deployment, verify the domain in Google Search Console, submit `https://openpath.biz.id/sitemap.xml`, and test both pages and the sharing image. Search rankings and rich results are not guaranteed.

Set the Web3Forms key in the hosting build environment and test delivery. Audit privacy/legal requirements for the deployment and review the product security model before publishing. The file API jail is not a hard sandbox for arbitrary shell commands; use approvals or OS-level isolation for untrusted agents.
