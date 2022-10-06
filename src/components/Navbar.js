import logoImage from "../assets/logo.png";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useCollapsed from "../hooks/useCollapsed";
import Dashboard from "./Dashboard/Dashboard";
const { Header, Footer } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useCollapsed();
  console.log(collapsed);

  const menuItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 1, name: "Home", path: "/home" },
    { id: 1, name: "Home", path: "/inbox" },
    { id: 1, name: "Home", path: "/messages" },
    { id: 1, name: "Home", path: "/dashboard" },
  ];

  return (
    <Layout className="layout">
      <Header className="flex lg:flex-row flex-col lg:h-20 h-auto items-center justify-start font-semibold  text-[#F0F2F5] lg:p-0 p-4 ">
        <div className="logo" />

        <div className="flex justify-start items-center">
          <img src={logoImage} className="w-16 mr-2" alt="logoImage" />
          <h2 className="text-3xl mr-4 text-slate-300">Real Chat</h2>
        </div>

        <div className="flex items-center text-2xl">
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={menuItems.map((m) => {
              return {
                label: <Link to={m.path}>{m.name}</Link>,
              };
            })}
          />
        </div>
      </Header>

      <Dashboard collapsed={collapsed} />

      <Footer className="text-sm font-semibold text-center text-white py-6  bg-[#1C2E4C]">
        ©2022 <span className="text-[#8d9493] hover:text-[#3e66ac]">Real Chat</span>. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default Navbar;
