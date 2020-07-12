import React from "react";
import CanvasDraw from "react-canvas-draw";
import { Row, Typography, Column, Button } from 'antd';
const { Text, Title } = Typography;

export default function Home() {
  return (
    <Row md={6}>
      <Title>Recognize Handwritten Digits</Title>
      <Text strong>Draw a digit from 0-9</Text>

      <CanvasDraw />
      <br />
      <br />
      <Button type="primary">Predict</Button>
    </Row>
  )
}
