import { Col, Layout, Menu, Row } from "antd";
import { default as Link } from "next/link";

const { Header } = Layout;

const HeaderBow: React.FC<{}> = () => {
  return (
    <div
      style={{
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
      }}
    >
      <Header
        style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: '#408862'
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: 1300
          }}
        >
          <Row>
            <Col span={4}>
              <div style={{ color: "white" }}>
              Recognize Handwritten Digits</div>
            </Col>
          </Row>
        </div>
      </Header>
    </div>
  );
};

export default HeaderBow;
