import { Layout } from "antd";

const { Footer } = Layout;

const FooterBow: React.FC<{}> = () => {
  return (
    <Footer
      style={{
        padding: 0,
        marginTop: 60
      }}
    >
      Some footer
    </Footer>
  );
};

export default FooterBow;
