import logoImage from "../assets/logo.png";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";

import { Button, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/lib/input/Search";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";
import { setCollapsed } from "../features/collapsed/collapsedSlice";
const { Header } = Layout;

const Navbar = ({ children }) => {
  const [fold, setFold] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { name: "Home", key: "/" },
    { name: "Inbox", key: `/inbox` },
    { name: "Inbox", key: `/inbox` },
  ];

  const onSearch = (value) => console.log(value);

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  useEffect(() => {
    dispatch(
      setCollapsed({
        type: fold,
      })
    );
  }, [fold, dispatch]);

  return (
    <Layout className="layout">
      <Header className="h-auto font-semibold lg:p-0 p-4 sticky z-40 top-0">
        <div className="logo" />
        <div className="flex lg:flex-row flex-col items-center justify-around mx-4">
          <div className=" flex items-center mx-4 my-4">
            <img src={logoImage} className="w-16 mr-2" alt="logoImage" />
            <h2 className="text-3xl  text-gray-light font-mono">Real Chat</h2>
          </div>

          <div className="flex mr-auto   mx-4">
            <div className="flex  items-center">
              <div className="lg:visible invisible lg:mb-3  text-2xl text-[#3f5b8d] ">
                {React.createElement(fold ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: () => setFold(!fold),
                })}
              </div>
              <Menu
                className=" flex lg:justify-start lg:space-x-1 items-center justify-between lg:w-72 w-96"
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
            <Button onClick={logout} className="bg-primary text-gray-light ">
              Logout
            </Button>
          </div>
        </div>
      </Header>

      <div>{children}</div>
    </Layout>
  );
};

export default Navbar;
