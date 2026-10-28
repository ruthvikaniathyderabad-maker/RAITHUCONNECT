# RAITHUCONNECT — Plugin checklist status
Checked: 2026-10-28

## Completed and verified
- Supabase project healthy: https://supabase.com/dashboard/project/czhwdzeheuvmocqpzmfq
- Added public.demo_products with 15 illustrative product rows. Live API query returned count=15 and source=supabase.
- Created public Storage bucket product-images; public read and owner-folder upload policies applied.
- Supabase security advisor: no findings. Performance advisor: 13 informational unused-index findings; not security failures.
- Figma editable design system and screens: https://www.figma.com/design/Nzrtk4XL4hh1AG68MZPZMJ. Foundations, listing, cart/checkout, and farmer dashboard screenshots were captured for review.
- Canva editable landing-page design: https://canva.link/3yu476fbpteeliv
- Exa used to research official Department of Consumer Affairs daily price monitoring. Demo prices are illustrative and not live farmer quotes.
- Local Express API and demo storefront created at C:\Users\Default\Documents\RAITHUCONNECT. Open http://localhost:8188 on the same computer while the local server is running.
- Local routes: GET /api/health and GET /api/catalog. API uses the public Supabase publishable/anon key and remains subject to RLS; no service-role key is used.
- Local verification: /api/health returned status=ok; /api/catalog returned 15 rows from Supabase; homepage and app.js returned HTTP 200.
- Local checks pass: node syntax checks and 4/4 Node tests (health, catalog fallback, homepage/assets, 404).
- Local Git repository initialized and committed in phases. Commits include 1b1b572 (API scaffold/tests), b1a74e4 (docs/CI), 7773be7 (storefront app scaffold/tests), and 11cadbd (catalog/storefront updates).
- GitHub Actions CI workflow, README, .env.example, .gitignore, and docs/API-IMPACT-MAP.md are present locally.

## Not completed / blocked
- Mobbin: connector requires a paid plan; no references fetched.
- Magnific: no connected Magnific integration available. Everygen image generation failed because no active subscription exists; 0 credits charged. The 15 product image URLs are external Unsplash placeholders, not generated/enhanced original photos. URLs and licensing need validation.
- GitHub: no repositories accessible in the connected GitHub account; desktop gh auth status says not logged in. Local commits exist, but no remote repo, push, remote CI run or PRs.
- Railway and Notion: their connections were declined/not enabled for this turn. No Railway deployment or Notion page exists.
- Vercel: no matching RAITHUCONNECT project found; no Vercel migration/deployment. The production frontend remains Wix-hosted.
- The local storefront is a separate demo and has not replaced or been wired into the live Wix frontend. Live website: https://headless-yktnkzwvmtj-ruthvikaniathydera-1412.wix-site-host.com/.
- Razorpay and WhatsApp provider secrets remain unconfigured; no real payments or WhatsApp messages tested.
- No complete browser E2E with real buyer/farmer accounts.
- API Impact Mapper was invoked but returned partial because hypothetical risks are not confirmed API changes and no actual API diff/OpenAPI contract was supplied. The manual screen-to-endpoint map is available.
- AI Voice Generator: created a clear-voice demo narration audio. Preview: https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/84c0dc66-5aeb-4c48-9bf3-8e4a8ef9aef7.mp3 ; full audio: https://www.aidocmaker.com/g0/audio?name=47cde0b9bd2e42ca8dccfd53e77ce762 . No narrated video created because Everygen video/image generation requires an active subscription.

## Local project files
- api/server.js; public/index.html; public/styles.css; public/app.js; public/products.json
- test/server.test.js; package.json; package-lock.json; .env.example; .gitignore
- .github/workflows/ci.yml; docs/API-IMPACT-MAP.md; README.md; CHECKLIST-REPORT.md; CHECKLIST-STATUS.md

## Before production release
1. Authenticate GitHub and create/select a repository with write access; push local commits, run remote CI, and open feature PRs.
2. Connect Railway only if still desired; select the intended workspace and set server configuration in the provider secret manager.
3. Keep Wix or deliberately migrate to Vercel; do not replace the live site unintentionally.
4. Wire the production UI to the intended catalog source; keep demo listings separate from verified farmer inventory until approved.
5. Replace external image placeholders with original/licensed produce photos; verify URLs and rights.
6. Configure Razorpay test credentials/webhook and WhatsApp Cloud API credentials/template; test success/failure, signatures, idempotency and opt-in.
7. Run browser E2E for buyer, pending farmer, approved farmer and admin; re-check RLS and payment state.
8. Supply an actual API diff/OpenAPI contract to API Impact Mapper for a grounded classification.

## Cost and safety
- No paid hosting deployment was made during this pass.
- Supabase was previously quoted at $0/month, but usage and future upgrades/provider services may cost money.
- Never commit .env or share service-role keys, Razorpay secrets or WhatsApp tokens.