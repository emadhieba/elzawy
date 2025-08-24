import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import * as express from 'express';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';

// Import the server module
import bootstrap from './src/main.server';

declare const __dirname: string;

// The Express server
const server = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = join(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

// Create a new instance of CommonEngine
const commonEngine = new CommonEngine({
  bootstrap
});

// Set the view engine and views directory
server.set('view engine', 'html');
server.set('views', browserDistFolder);

// Enable compression
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Serve static files from /browser with cache control
server.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  fallthrough: true
}));

// Handle all other routes with Angular Universal
server.get('*', (req: express.Request, res: express.Response) => {
  const { protocol, originalUrl, headers } = req;
  
  // Check if the requested file exists
  const filePath = join(browserDistFolder, originalUrl.split('?')[0]);
  if (existsSync(filePath) && !filePath.endsWith('/')) {
    return res.sendFile(filePath);
  }

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl || '/' }
      ]
    })
    .then((html: string) => res.send(html))
    .catch((err: Error) => {
      console.error('Error during server-side rendering:', err);
      res.status(500).send('Error occurred rendering the page');
    });
});

// Start the server
const port = process.env['PORT'] || 4000;
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
  console.log(`Serving static files from: ${browserDistFolder}`);
});
