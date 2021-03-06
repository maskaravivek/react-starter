/* eslint-disable */
const lessToJs = require("less-vars-to-js");

const withPlugins = require("next-compose-plugins");

const withLess = require("@zeit/next-less");
const withOffline = require("next-offline");
const withOptimizedImages = require("next-optimized-images");
const withTM = require("next-transpile-modules");

const fs = require("fs");
const path = require("path");

const themeVariables = lessToJs(
  fs.readFileSync(path.resolve(__dirname, "./less/antd-custom.less"), "utf8")
);

module.exports = withPlugins(
  [
    [
      withLess({
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables
        },
        webpack: (config, options) => {
          // In `pages/_app.js`, Sentry is imported from @sentry/node. While
          // @sentry/browser will run in a Node.js environment, @sentry/node will use
          // Node.js-only APIs to catch even more unhandled exceptions.
          //
          // This works well when Next.js is SSRing your page on a server with
          // Node.js, but it is not what we want when your client-side bundle is being
          // executed by a browser.
          //
          // Luckily, Next.js will call this webpack function twice, once for the
          // server and once for the client. Read more:
          // https://nextjs.org/docs#customizing-webpack-config
          //
          // So ask Webpack to replace @sentry/node imports with @sentry/browser when
          // building the browser's bundle
          if (!options.isServer) {
            config.resolve.alias["@sentry/node"] = "@sentry/browser";
          }

          if (options.isServer) {
            const antStyles = /(antd\/.*?\/style).*(?<![.]js)$/;
            const origExternals = [...config.externals];
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === "function") {
                  origExternals[0](context, request, callback);
                } else {
                  callback();
                }
              },
              ...(typeof origExternals[0] === "function" ? [] : origExternals)
            ];

            config.module.rules.unshift({
              test: antStyles,
              use: "null-loader"
            });
          }

          config.plugins = config.plugins || [];

          return config;
        }
      })
    ],
    [withOptimizedImages],
    [withOffline],
    [withTM([])]
  ],
  {
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    env: {
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
      MAPBOX_PUBLIC_ACCESS_TOKEN: process.env.MAPBOX_PUBLIC_ACCESS_TOKEN,
      SENTRY_DSN_WEB: process.env.SENTRY_DSN_WEB
    },
    target: "serverless",
    webpack: (config, options) => {
      // In `pages/_app.js`, Sentry is imported from @sentry/node. While
      // @sentry/browser will run in a Node.js environment, @sentry/node will use
      // Node.js-only APIs to catch even more unhandled exceptions.
      //
      // This works well when Next.js is SSRing your page on a server with
      // Node.js, but it is not what we want when your client-side bundle is being
      // executed by a browser.
      //
      // Luckily, Next.js will call this webpack function twice, once for the
      // server and once for the client. Read more:
      // https://nextjs.org/docs#customizing-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle
      if (!options.isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      if (options.isServer) {
        const antStyles = /(antd\/.*?\/style).*(?<![.]js)$/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals)
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader"
        });
      }

      config.plugins = config.plugins || [];

      return config;
    },
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https.*\/api\//,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 60 * 60 // 1 hour
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
);
