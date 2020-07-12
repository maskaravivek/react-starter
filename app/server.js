const express = require('express');
const http = require('http');
const next = require('next');
const open = require('open');
const path = require('path');

const { devProxy } = require('./proxy');
const { dockerProxy } = require('./proxy');

const PORT = process.env.PORT || 3000;

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const main = async () => {
  await app.prepare();

  const server = express();

  app.setAssetPrefix(process.env.STATIC_PATH);

  server.use(express.static(path.join(__dirname, '../static')));

  if (process.env.PROXY_MODE === 'local') {
    const proxyMiddleware = require('http-proxy-middleware');
    const proxy = process.env.DOCKER ? dockerProxy : devProxy

    Object.keys(proxy).forEach((context) => {
      server.use(proxyMiddleware(context, proxy[context]));
    });
  }

  const handler = app.getRequestHandler();

  server.get('*', (req, res) => {
    return handler(req, res);
  });

  await new Promise((resolve, reject) =>
    http
      .createServer(server)
      .listen(PORT, (err) => (err ? reject(err) : resolve()))
  );

  const localUrl = `http://localhost:${PORT}`;

  console.log(`>>> Ready on ${localUrl}`);

  await open(localUrl);
};

main()
  .then(() => {})
  .catch((e) => console.error(e));
