import logoImage from "../assets/logo.png";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";

import { Button, Layout, Menu } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCollapsed from "../hooks/useCollapsed";
import Search from "antd/lib/input/Search";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";
const { Header } = Layout;

const Navbar = ({ children }) => {
  const [collapsed, setCollapsed] = useCollapsed();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const menuItems = [
    { name: "Inbox", key: `/inbox` },
    { name: "Messages", key: "/messages" },
    { name: "Conversations", key: "/inbox" },
  ];

  const onSearch = (value) => console.log(value);


   const logout = () => {
     dispatch(userLoggedOut);
     localStorage.clear();
   };

  return (
    <Layout className="layout ">
      <Header className="h-auto font-semibold text-[#F0F2F5] lg:p-0 p-4 sticky z-40 top-0">
        <div className="logo" />
        <div className="flex lg:flex-row flex-col items-center justify-around mx-4">
          <div className=" flex items-center mx-4 my-4">
            <img src={logoImage} className="w-16 mr-2" alt="logoImage" />
            <h2 className="text-2xl  text-slate-500">Real Chat</h2>
          </div>

          <div className="flex-1   mx-4">
            <div className="flex  items-center">
              <div className="lg:visible invisible lg:mb-1  text-2xl text-[#3f5b8d] ">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                })}
              </div>
              <Menu
                className="w-96 flex lg:justify-start items-center justify-between"
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[window.location.pathname]}
                items={menuItems.map((m) => {
                  return {
                    label: <Link to={m.key}>{m.name}</Link>,
                  };
                })}
              />
            </div>
          </div>
          <div className="flex items-center mx-4">
            <Search placeholder="Search" allowClear onSearch={onSearch} className="lg:w-75 w-48" />
            <Menu
              onClick={({ key }) => navigate(key)}
              className="w-32"
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[window.location.pathname]}
              items={[
                {
                  key: "profile",
                  icon: <UserOutlined style={{ fontSize: "16px", color: "#08c", marginBottom: "4px" }} />,
                  label: "Profile",
                },
              ]}
            />
            <Button onClick={logout} className=" text-slate-300 ">Logout</Button>
          </div>
        </div>
      </Header>

      <div>{children}</div>
    </Layout>
  );
};

export default Navbar;
