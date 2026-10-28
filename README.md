<p align="center">
  <a href="https://zwantradingltd.co.uk"><img src="public/assets/logo.webp" alt="The Essentials Store — Big Value. Everyday Prices." width="320"></a>
</p>

<h1 align="center">The Essentials Store</h1>

<p align="center"><strong>Big Value. Everyday Prices.</strong><br>Your local essentials shop on Harehills Lane, Leeds.</p>

<p align="center">
  <a href="https://zwantradingltd.co.uk"><strong>Visit our website</strong></a> ·
  <a href="https://zwantradingltd.co.uk/#range">Explore our range</a> ·
  <a href="https://zwantradingltd.co.uk/#visit">Find the store</a> ·
  <a href="https://wa.me/447466353588">WhatsApp</a>
</p>

---

## About the store

**The Essentials Store**, operated by **Zwan Trading Ltd**, brings useful everyday items together in one welcoming Leeds shop. From cooking and DIY to writing and play, our range helps customers find the practical things they need for daily life.

| Department | Explore in store |
| --- | --- |
| Kitchenware | Pots, pressure cookers, cutlery and kitchen utensils |
| DIY & tools | Screwdrivers, nails, screws, paint and everyday tools |
| Stationery | Supplies for writing, schoolwork and creative activities |
| Toys & household essentials | Toys and useful items for everyday living |

Product imagery is illustrative. Our range changes; contact the store to confirm current stock, prices and specific products.

## Visit & contact

**221 Harehills Lane, Leeds, LS8 3QH, United Kingdom**

| Opening days | Regular hours |
| --- | --- |
| Monday–Saturday | 10 AM–8 PM |
| Sunday | 10 AM–7 PM |

Hours are in Leeds local time. Please contact us for bank holiday hours.

- **Website:** [zwantradingltd.co.uk](https://zwantradingltd.co.uk)
- **Primary telephone:** 0113 318 3217
- **Alternative telephone:** 0113 318 3271
- **Mobile / WhatsApp:** [07466 353588](https://wa.me/447466353588)
- **Email:** [supports@zwantradingltd.co.uk](mailto:supports@zwantradingltd.co.uk)
- **Directions:** [Find us on Google Maps](https://www.google.com/maps/search/?api=1&query=221%20Harehills%20Lane%2C%20Leeds%2C%20LS8%203QH)

Shop in store. Delivery may be arranged for selected items, depending on the delivery address and order amount. Contact our team to confirm arrangements and charges. The website does not currently offer online checkout.

## About this project

This repository contains the React website for The Essentials Store.

- Responsive layouts for desktop, tablet and mobile.
- Product-category navigation, store information and frequently asked questions.
- Direct links for directions, telephone, email and WhatsApp.
- A Gemini-powered AI assistant for store enquiries.
- Chat consent, visible error messages and keyboard-accessible controls.
- Custom branding, favicons and product imagery.

The assistant provides guidance, not live inventory or confirmed orders. Customers should verify availability, pricing, warranties and delivery arrangements with staff.

## Technology & hosting

| Layer | Technology |
| --- | --- |
| Frontend | React, JavaScript and CSS |
| Build tooling | Vite |
| Frontend hosting | Render Static Site |
| Chat API | Cloudflare Worker |
| AI service | Google Gemini API |
| Domain & DNS | Porkbun |

The browser loads the static React website from Render. Chat messages are sent to a Cloudflare Worker, which calls Gemini with server-owned store information. The Gemini API key is stored as a Worker secret and is never required in the React build.

The repository retains Express files from the earlier hosting setup. The current frontend calls the Cloudflare Worker directly; Express is not required for the current static deployment.

## Run locally

Use Node.js 24 and npm.

```bash
git clone https://github.com/tawakuliKH/essentials-store.git
cd essentials-store
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

**Windows PowerShell:** if script execution blocks `npm`, use `npm.cmd` instead, for example `npm.cmd run dev`.

### Project commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Generate the production site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the configured Oxlint checks |
| `npm start` | Run the retained Express server from the earlier setup |

### Chat configuration

The frontend chat endpoint is configured in [`src/components/Chatbot.jsx`](src/components/Chatbot.jsx).

For an independent deployment, create your own Worker and Gemini configuration. The deployed Worker is managed separately in Cloudflare; cloning this repository does not provision it.

| Worker setting | Type | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Secret | Authenticate requests to Gemini |
| `GEMINI_MODEL` | Text variable | Select the Gemini model |

Allow your frontend's exact origin in the Worker's CORS configuration. Local development and production use different origins.

**Do not place API keys in React source, public assets or `VITE_` environment variables. Do not commit secret environment files.** Browser origin checks are not authentication, and basic request limits are not spending caps.

## Deploy the frontend

The current Render Static Site uses:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Build command | `npm ci --include=dev && npm run build` |
| Publish directory | `dist` |
| Node version | `24` |

No Gemini API key is needed in Render's static-site environment. When changing domains, update the Worker's allowed origins as well.

## Project structure

```text
public/assets/       Brand images, favicons and product imagery
src/components/      Store sections and chatbot interface
src/App.jsx          Page composition and navigation
src/index.css        Shared styles and brand colours
src/main.jsx         React entry point
index.html           Document metadata and application root
api/                 Retained Express-compatible chat handler
server/              Retained Express server and store knowledge
vite.config.js       Vite development and build configuration
```

## Feedback

For website bugs, [open a GitHub issue](https://github.com/tawakuliKH/essentials-store/issues) with the page, browser and steps to reproduce the problem. Do not post API keys, customer details or private purchase information in public issues.

For product enquiries, delivery, returns or warranties, contact the store directly using the details above.

---

<p align="center"><strong>The Essentials Store · Zwan Trading Ltd</strong><br>Useful finds for everyday life.</p>
