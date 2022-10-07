import {
  UploadOutlined,
  PoweroffOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  InfoCircleOutlined,
  UserOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import Home from "../../pages/Home";

const { Sider, Content } = Layout;

const Dashboard = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="lg:h-screen h-auto">
        <div className="logo" />
        <Menu
          onClick={({ key }) => navigate(key)}
          className="lg:h-screen lg:w-full w-screen flex lg:flex-col flex-row sticky z-40"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: "/home",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "/info",
              icon: <InfoCircleOutlined />,
              label: "Info",
            },
            {
              key: "/usersList",
              icon: <UnorderedListOutlined />,
              label: "UsersList",
              children: [
                {
                  key: "/activeUsersList",
                  icon: <UserOutlined />,
                  label: "ActiveUsersList",
                },
                {
                  key: "/disabledUsersList",
                  icon: <UserDeleteOutlined />,
                  label: "DisabledUsersList",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout bg-[#1C2E4C] lg:relative absolute left-0 lg:top-0 top-64 lg:min-w-0 min-w-full h-screen">
        <Content className="bg-[#0C1A32] text-[#98ACC3] lg:my-6 lg:mx-4 py-6 px-6">
          <Home />
        </Content>

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
