# Local setup and release checklist

## Local run
1. Install Node.js 20+.
2. From this folder run `npm install`.
3. Copy `.env.example` to `.env`.
4. Configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` for public catalog reads. Use a publishable/anon key only; the catalog is protected by RLS.
5. Set `PORT=8188` if port 8080 is already occupied.
6. Run `npm run check`, `npm test`, and `npm start`.
7. Open `http://localhost:8188`.

## Provider setup required for real transactions
In Supabase Dashboard → Edge Functions → Secrets, configure Razorpay test-mode values:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Webhook URL: `https://czhwdzeheuvmocqpzmfq.supabase.co/functions/v1/razorpay-webhook`
Events: `payment.captured`, `payment.failed`, `order.paid`

WhatsApp Cloud API secrets:
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_ORDER_TEMPLATE_NAME` (approved template with order number and total)
- Optional: `WHATSAPP_TEMPLATE_LANGUAGE=en`, `WHATSAPP_GRAPH_API_VERSION=v23.0`

Never paste secrets into chat or commit them to Git. Set them in the provider's secret manager.

## Deploy status
- Local Express API: implemented and tested on the connected Windows desktop.
- Supabase demo catalog: seeded with 15 records and queried successfully.
- Local storefront: served successfully from Express.
- Vercel project: no existing RAITHUCONNECT project was found in the connected Vercel account; deployment not performed because the source and repository connection need explicit setup.
- Railway: not connected/available in this run.
- GitHub: current GitHub connection has no repositories listed and local `gh auth status` reports not logged in; no remote push/PR/CI run can be claimed.
- Notion: not connected/available in this run.
- Existing Wix production site was not replaced by the prototype to avoid removing its current auth/chat/payment wiring.
