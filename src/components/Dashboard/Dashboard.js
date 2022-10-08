import {
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

const { Sider, Content } = Layout;

const Dashboard = ({ collapsed, children }) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="lg:h-[100vh] lg:fixed top-22 left-0">
        <div className="logo" />
        <Menu
          onClick={({ key }) => navigate(key)}
          className="lg:h-screen lg:w-full w-[calc(100vw_-_17px)] flex lg:flex-col flex-row sticky z-40"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: "/",
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

      <Layout className="site-layout bg-[#1C2E4C] lg:ml-[200px] lg:relative absolute left-0 lg:top-0 top-64 lg:min-w-0 min-w-full min-h-screen">
        <Content className="bg-[#0C1A32] text-[#98ACC3] lg:my-6 lg:mx-4 pt-12 pb-9 px-6">{children}</Content>

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
