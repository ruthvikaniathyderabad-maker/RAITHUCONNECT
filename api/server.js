import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createClient } from '@supabase/supabase-js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const seedFile = join(root, 'public', 'products.json');

export function createApp({ supabaseClient = undefined, seedProducts = null, disableDatabase = false } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet({
    contentSecurityPolicy: { directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'https://images.unsplash.com', 'data:'],
      connectSrc: ["'self'", 'https://czhwdzeheuvmocqpzmfq.supabase.co'],
      fontSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }}
  }));
  app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()).filter(Boolean) || ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:8188'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json({ limit: '100kb' }));

  // Public catalog access uses the publishable/anon key and remains subject to Supabase RLS.
  const client = disableDatabase ? null : (supabaseClient !== undefined ? supabaseClient : (
    process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
      ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          auth: { persistSession: false, autoRefreshToken: false }
        })
      : null
  ));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'raithuconnect-api', databaseConfigured: Boolean(client), timestamp: new Date().toISOString() });
  });

  app.get('/api/catalog', async (_req, res) => {
    if (client) {
      const { data, error } = await client.from('demo_products')
        .select('id,name,category,price,unit,stock,image_url,origin,description,demo_only,source_note')
        .order('category', { ascending: true }).order('name', { ascending: true });
      if (!error && Array.isArray(data)) return res.json({ data, count: data.length, demo: true, source: 'supabase' });
    }
    try {
      const data = seedProducts || JSON.parse(await readFile(seedFile, 'utf8'));
      return res.json({ data, count: data.length, demo: true, source: 'bundled-seed' });
    } catch {
      return res.status(503).json({ error: 'catalog_unavailable', message: 'Catalog is not configured.' });
    }
  });

  app.use(express.static(join(root, 'public'), { extensions: ['html'] }));
  app.use((_req, res) => res.status(404).json({ error: 'not_found' }));
  app.use((err, _req, res, _next) => {
    const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 600 ? err.status : 500;
    res.status(status).json({ error: status === 500 ? 'internal_error' : 'request_error' });
  });
  return app;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 8080);
  createApp().listen(port, '0.0.0.0', () => console.log(`RAITHUCONNECT API listening on ${port}`));
}