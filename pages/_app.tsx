import * as React from "react";

import nextReduxWrapper from "next-redux-wrapper";
import { default as App } from "next/app";

// import * as Sentry from "@sentry/node";

import { Provider } from "react-redux";
import { Store } from "redux";

import Layout from "@components/Layout";
import store from "@redux/store";

import { NextSeo } from "next-seo";
import "../node_modules/antd/dist/antd.less";

interface IProps extends React.Props<{}> {
  isMobileFromSSR: boolean;
  store: Store;
}

class GlobalApp extends App<IProps, {}, {}> {
  constructor(props) {
    super(props);
  }

  public static async getInitialProps() {
    return {
      pageProps: {}
    };
  }

  public render(): JSX.Element {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Provider store={store}>
          <NextSeo
            title={"Customer 360 | Bank of the West"}
            description={
              "A unified customer portal to visualize banking needs."
            }
            openGraph={{
              site_name: "Customer 360"
            }}
          />

          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
}

export default nextReduxWrapper(store)(GlobalApp);
