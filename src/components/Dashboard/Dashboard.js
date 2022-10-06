import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import useCollapsed from "../../hooks/useCollapsed";
const { Header, Sider, Content } = Layout;

const Dashboard = ({ collapsed }) => {
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="lg:h-screen h-0 ">
        <div className="logo" />
        <Menu
          className="lg:h-screen lg:w-full w-screen  flex lg:flex-col flex-row"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout bg-[#1C2E4C] lg:relative absolute left-0 lg:top-0 top-40  lg:min-w-0 min-w-full h-screen">
        <Content className="bg-[#0C1A32] text-[#98ACC3] lg:my-6 lg:mx-4 py-2 px-4">Content</Content>

        <Footer className="text-sm font-semibold text-center text-white py-6  bg-[#1C2E4C] flex justify-between">
          <div>
            <small>
              ©2022 <span className="text-[#8d9493] hover:text-[#3e66ac]">Real Chat</span>. All Rights Reserved.
            </small>
          </div>
          <div>
            <small>FAQ / Privacy Policy</small>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
