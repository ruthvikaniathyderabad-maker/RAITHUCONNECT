# RAITHUCONNECT staging deployment

Checked: 2026-10-28

## Deployment
- Staging URL: https://raithuconnect-staging.onrender.com
- Render service: `raithuconnect-staging`
- Dashboard: https://dashboard.render.com/web/srv-dbgqlfgn74is73d64l5g
- GitHub repository: https://github.com/ruthvikaniathyderabad-maker/RAITHUCONNECT
- Deployed commit: `fcec3f989f4de4bd14dc8fb62626cbe09a123550`
- Deployment: `dep-dbgqmhh42hec73dpqr40` — Render reported status `live`.
- Hosting plan: Render free plan; usage and plan terms may change.

## Verified live checks
- `GET /` — HTTP 200, HTML.
- `GET /app.js` — HTTP 200, JavaScript.
- `GET /styles.css` — HTTP 200, CSS.
- `GET /api/health` — HTTP 200; `databaseConfigured=true` after environment configuration.
- `GET /api/catalog` — HTTP 200; 15 rows returned from Supabase (`source=supabase`).
- `GET /api/not-a-route` — HTTP 404.
- GitHub Actions CI succeeded: npm install, code check and four Node tests.
- Supabase security advisor returned no findings. Performance advisor returned 13 informational unused-index notices.

## Important limitations
- Catalog entries are illustrative demo listings, not live farmer offers. Demo prices must not be represented as current market quotes.
- The basket is a prototype; real order checkout is disabled/not production-verified.
- Razorpay and WhatsApp credentials are not configured for live end-to-end testing. Configure secrets only in the provider's secret manager; never commit them or send them in chat.
- Buyer/farmer/admin workflows have not completed a full browser end-to-end test with real accounts.
- External image URLs remain placeholders and require licensing/availability review.
- Wix remains the live entry point and has not been modified or redirected. Do not switch production traffic until real-account workflows, payments, notifications, RLS, and rollback are verified.

## Safe next steps
1. Add Razorpay test credentials and webhook secret in Render only when available; test success, failure, webhook signature validation and idempotency.
2. Add WhatsApp Cloud API token, phone-number ID and approved template name in Render only when available; test opt-in and delivery.
3. Run buyer, pending-farmer, approved-farmer and admin browser tests, including RLS checks.
4. Replace/verify product image assets and confirm every listing is clearly marked demo until real inventory is connected.
5. Review the rollback procedure before any future production migration.
