import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <h2>Hello World</h2>
      <Button className="font-semibold text-red-700" type="primary" shape="round" icon={<DownloadOutlined />}>
        Button Antd
      </Button>
    </div>
  );
}

export default App;
