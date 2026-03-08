import express from 'express';
import cors from 'cors';
import { readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Dynamic route handler — loads route files on each request
// This means new routes are picked up immediately without server restart
const routesDir = join(__dirname, 'routes');

app.use('/api', async (req, res, next) => {
    const routeName = req.path.split('/')[1];
    if (!routeName || routeName === 'health') return next();

    const routePath = join(routesDir, routeName + '.js');
    try {
        // Cache-bust to always get latest version
        const mod = await import(routePath + '?t=' + Date.now());
        const handler = mod.default || mod.handler;
        if (handler) {
            return handler(req, res);
        }
    } catch (e) {
        // Route file doesn't exist or has errors
        if (e.code === 'ERR_MODULE_NOT_FOUND') {
            return res.status(404).json({ error: `Route /api/${routeName} not found` });
        }
        console.error(`[server] Error in /api/${routeName}:`, e.message);
        return res.status(500).json({ error: `Server error in /api/${routeName}` });
    }
    next();
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`[server] API server running on http://localhost:${PORT}`);
});