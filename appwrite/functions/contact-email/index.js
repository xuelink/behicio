export default async ({ req, res, log }) => {
  // Minimal hello world for HTTP trigger testing
  log('hello world', { method: req?.method || 'GET', path: req?.path || '/' });
  if (req?.path === '/ping') return res.text('Pong');
  return res.json({ ok: true });
};


