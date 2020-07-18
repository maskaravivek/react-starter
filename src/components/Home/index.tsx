import React from "react";
import { Row, Typography, Button } from 'antd';

const { Text, Title } = Typography;

const Home: React.FC<{}> = ({

}) => {
  const [saveableCanvas, setSaveableCanvas] = React.useState<any>("");
  return (
    <Row>
      <Text strong>Hello World!</Text>
    </Row>
  );
};

export default Home;