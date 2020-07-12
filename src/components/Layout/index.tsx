import * as React from "react";

import { Layout as AntLayout } from "antd";
import { default as Router } from "next/router";

import { initGA, logPageView } from "@api/analytics";
import Footer from "@components/Footer";
import Header from "@components/Header";

const { Content } = AntLayout;

const Layout: React.FC<{}> = ({ children }) => {
  React.useEffect(() => {
    initGA();
    logPageView();

    if (Router.router) {
      Router.router.events.on("routeChangeComplete", logPageView);
    }
    return () => {
      if (Router.router) {
        Router.router.events.off("routeChangeComplete", logPageView);
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <Content
        style={{
          margin: "auto",
          paddingLeft: 50,
          paddingRight: 50,
          marginTop: 50,
          maxWidth: 1600,
          minHeight: "34vh"
        }}
      >
        {children}
      </Content>
      <Footer />
    </div>
  );
};

export default Layout;
