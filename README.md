# RAITHUCONNECT API companion

This folder contains a small Express API companion for the existing Wix-hosted frontend and Supabase project. It is not a replacement for the existing Supabase Edge Functions.

## Routes
- GET /api/health — process health and non-sensitive configuration status.
- GET /api/catalog — reads the read-only demo catalog from Supabase using the public publishable key and RLS.

## Local setup
1. Install Node.js 20+.
2. Copy .env.example to .env.
3. Set SUPABASE_URL and SUPABASE_ANON_KEY (the public publishable/anon key) in the local environment file.
4. Run npm install, then npm test, then npm start.
5. Check http://localhost:8080/api/health and http://localhost:8080/api/catalog.

Never use a service-role key in this read-only API or expose it to the browser. Public catalog access remains governed by Supabase RLS.

## Demo data
The Supabase demo_products table contains illustrative sample listings. Prices are demo values, not live offers or verified farmer quotes. Confirm local mandi prices before any real transaction. The product-images Storage bucket is public-read for product media; write access is restricted to authenticated users' own folder prefix.

## Hosting status
The API source is local. It is not deployed until hosting is connected and configured. The current production frontend remains on Wix until a deliberate migration is approved.

## Docs
See docs/API-IMPACT-MAP.md for screen-to-endpoint dependencies and contract risks.