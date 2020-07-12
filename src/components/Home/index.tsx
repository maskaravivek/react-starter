import React from "react";
import CanvasDraw from "react-canvas-draw";
import { Row, Typography, Button } from 'antd';

const { Text, Title } = Typography;

const Home: React.FC<{}> = ({

}) => {
  const [saveableCanvas, setSaveableCanvas] = React.useState<any>("");
  return (
    <Row>
      <Text strong>Draw a digit from 0-9</Text>

      <CanvasDraw ref={canvasDraw => (setSaveableCanvas(canvasDraw))} />
      <br />
      <br />
      <Button onClick={() => {
        localStorage.setItem(
          "savedDrawing",
          saveableCanvas.getSaveData()
        );
      }} type="primary">Predict</Button>
    </Row>
  );
};

export default Home;