# RAITHUCONNECT API dependency and breaking-change map

Scope: prospective contract-risk map based on the currently reported implementation. This is not a claim that a breaking change has already occurred. A full repository diff, OpenAPI spec and browser trace are still required for complete verification.

| Frontend screen / feature | Endpoint or data dependency | Breaking-change risks | Priority |
|---|---|---|---|
| Marketplace catalog | Supabase Data API: `public.products`; demo API: `GET /api/catalog` | Renaming `name`, `price`, `unit`, `stock`, `image_url` or changing status filtering breaks cards and sorting | High |
| Farmer application | Auth + writes to `profiles` and `farmer_profiles` | Required-field, enum or RLS changes can block applications | High |
| Farmer listing form | `farmer_profiles.verification_status`, insert/update `products` | Changing approved-state gate, required product fields or write policies can block listing creation | High |
| Cart / order request | Server-side order RPC; `orders` and `order_items` | Changing RPC signature, return shape, stock locking or transaction semantics risks overselling and failed orders | Critical |
| Razorpay checkout | `POST /functions/v1/create-razorpay-order`, `POST /functions/v1/verify-razorpay-payment` | Auth/header, amount units (paise), response fields or signature verification changes break checkout/security | Critical |
| Payment webhook | `POST /functions/v1/razorpay-webhook` | Disabling HMAC verification or changing expected payload handling risks forged payment state | Critical |
| Buyer/farmer chat | `conversations`, `messages`, Realtime subscriptions | Removing tables from Realtime publication or changing row access prevents message delivery | High |
| Order tracking | `orders`, Realtime subscription | Status enum changes or publication removal can leave stale order state | High |
| Order WhatsApp alert | `POST /functions/v1/notify-order-whatsapp` | Removing farmer phone and `whatsapp_opt_in` checks violates the intended consent gate | High |
| Farmer review/admin | `POST /functions/v1/review-farmer`, `app_metadata.role=admin` | JWT/role claim changes can lock out reviewers or accidentally broaden access | Critical |

## Test gates before changing a contract
- Validate response schemas and required fields for catalog, checkout and payment functions.
- Test RLS as anon, authenticated buyer, pending farmer, approved farmer and admin.
- Test atomic stock decrement with two concurrent checkout attempts.
- Verify Razorpay webhook HMAC and idempotency using test-mode events.
- Verify chat/order Realtime subscriptions after migrations.
- Confirm WhatsApp never sends without explicit opt-in.
- Run CI and a real browser checkout test before promoting to production.

## Current limitations
- Based on the supplied handoff, not repository inspection or API telemetry.
- Razorpay and WhatsApp provider secrets remain unconfigured.
- No payment retry UI or complete admin UI is currently reported.
- The production browser flow has not been fully tested with real accounts.