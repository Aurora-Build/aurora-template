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

// Auto-load routes from server/routes/
const routesDir = join(__dirname, 'routes');
if (existsSync(routesDir)) {
    const files = readdirSync(routesDir).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
    for (const file of files) {
        const routeName = file.replace(/\.(js|ts)$/, '');
        try {
            const mod = await import(join(routesDir, file));
            const handler = mod.default || mod.handler;
            if (handler) {
                app.all(`/api/${routeName}`, handler);
                console.log(`[server] Route loaded: /api/${routeName}`);
            }
        } catch (e) {
            console.error(`[server] Failed to load route ${file}:`, e.message);
        }
    }
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', routes: app._router?.stack?.filter(r => r.route)?.length || 0 });
});

app.listen(PORT, () => {
    console.log(`[server] API server running on http://localhost:${PORT}`);
});