import { default as NextDocument, Head, Main, NextScript } from "next/document";
import * as React from "react";

class Document extends NextDocument {
  public render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6699cc" />

          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#222222" />

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="apple-mobile-web-app-title"
            content="Customer 360 | Bank of the West"
          />
          <meta name="application-name" content="Customer 360 | Bank of the West" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta charSet="utf-8" />

          <noscript>You need to enable JavaScript to run this app.</noscript>

          <style
            dangerouslySetInnerHTML={{
              __html: `
              body {
                margin: 0;
                font-family: 'Arial', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
                  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                  sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
            `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Document;
