import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../api/server.js';

async function withServer(app, fn) {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();
  try { await fn(`http://127.0.0.1:${port}`); }
  finally { await new Promise((resolve) => server.close(resolve)); }
}

test('health endpoint works without database credentials and exposes no secrets', async () => {
  const app = createApp({ disableDatabase: true });
  await withServer(app, async (base) => {
    const response = await fetch(`${base}/api/health`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
    assert.equal(body.service, 'raithuconnect-api');
    assert.equal(body.databaseConfigured, false);
    assert.equal('serviceRoleKey' in body, false);
  });
});

test('catalog falls back to demo seed data without database credentials', async () => {
  const app = createApp({ disableDatabase: true, seedProducts: [{ id: 'demo-1', name: 'Tomatoes', price: 32, unit: 'kg' }] });
  await withServer(app, async (base) => {
    const response = await fetch(`${base}/api/catalog`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.count, 1);
    assert.equal(body.data[0].name, 'Tomatoes');
    assert.equal(body.source, 'bundled-seed');
  });
});

test('storefront serves homepage and app assets', async () => {
  const app = createApp({ disableDatabase: true });
  await withServer(app, async (base) => {
    const response = await fetch(base);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /RaithuConnect/);
    assert.match(html, /\/app\.js/);
    const js = await fetch(`${base}/app.js`);
    assert.equal(js.status, 200);
    assert.match(await js.text(), /renderProducts/);
  });
});

test('unknown routes return JSON 404', async () => {
  const app = createApp({ disableDatabase: true });
  await withServer(app, async (base) => {
    const response = await fetch(`${base}/not-a-route`);
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error, 'not_found');
  });
});