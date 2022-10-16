import logoImage from "../assets/logo.png";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import gravaterUrl from "gravatar-url";

import { Button, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";
import { setCollapsed } from "../features/collapsed/collapsedSlice";
const { Header } = Layout;

const Navbar = ({ children }) => {
  const [fold, setFold] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { name, email } = user || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Inbox", key: `/inbox` },
    { name: "Demo1", key: `/demo1` },
    { name: "Demo2", key: `/demo2` },
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
            <img src={logoImage} className="w-12 mr-2" alt="logoImage" />
            <h2 className="text-3xl  text-gray-light font-mono">Chat Prattle</h2>
          </div>

          <div className="flex mr-auto   mx-4">
            <div className="flex  items-center">
              <div className="lg:block lg:visible hidden lg:mb-3  text-2xl text-[#3f5b8d] ">
                {React.createElement(fold ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: () => setFold(!fold),
                })}
              </div>
              <Menu
                className=" flex lg:justify-start lg:space-x-1 items-center justify-between lg:w-72 w-[calc(100vw_-_90px)]"
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
            <Search placeholder="Search" allowClear onSearch={onSearch} disabled className="lg:w-75 w-48" />

            <span className="flex items-center lg:mx-9 mx-4">
              {email ? (
                <>
                  <img
                    src={gravaterUrl(email, { size: 80 })}
                    className="object-cover lg:mx-0 mx-2 h-10 w-10 rounded-full"
                    alt=""
                  />
                  <h2 className="text-gray lg:block lg:visible hidden text-lg uppercase font-thin font-mono mx-2">
                    {name}
                  </h2>
                </>
              ) : (
                <>
                  <UserOutlined style={{ fontSize: "16px", color: "#08c", marginBottom: "4px" }} />
                </>
              )}
            </span>
            {user ? (
              <Button onClick={logout} className="bg-primary text-gray-light ">
                Logout
              </Button>
            ) : (
              <Button onClick={() => navigate("/")} className="bg-primary text-gray-light ">
                Login
              </Button>
            )}
          </div>
        </div>
      </Header>

      <div>{children}</div>
    </Layout>
  );
};

export default Navbar;
