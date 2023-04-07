// import Login from "./pages/login";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import ClinicDetail from "./component/home/clinic-detail";
import Approved from "./pages/approved";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserLogin from "./pages/login";
import "./scss/App.scss";
import { useSelector } from "react-redux";

import { useViewport } from "./useViewport";

const NavbarWidth = {
  left: `0`,
  // overflow: "unset"
};
const RouterWidth = {
  width: `80%`,
  overflowY: `scroll`,
};
function App() {
  let appSlice = useSelector((state) => state.appSlice);
  let isLogin_store = appSlice.isLogin;
  const { innerWidth, innerHeight } = useViewport();
  const [height, setHeight] = useState(innerHeight);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [menuIsShow, setMenuIsShow] = useState(false);
  const [isLogin, setIsLogin] = useState(isLogin_store);
  useEffect(() => {
    setIsLogin(isLogin_store);
  }, [isLogin_store]);
  const goPath = useHistory(); //設常數接收useHistory()回傳的物件

  let headNavbarRef = useRef() || "";
  const style = {
    // height: `${100-45}px`,
    // height: `calc(100vh - (45 + ${toolbarHeight}) px)`,
    height: `calc(100vh - 45px - ${toolbarHeight}px)`,
    // height:"100vh",
    position: `relative`,
  };
  const menuHandler = () => {
    setMenuIsShow(!menuIsShow);
  };
  const goHome = () => {
    goPath.push(`/`);
  };
  const elementRef = useRef(null);
  // const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const toolbarHeight = window.outerHeight - window.innerHeight;
    setToolbarHeight(toolbarHeight);
    // const contentHeight = window.innerHeight - toolbarHeight;
    // console.log(toolbarHeight,contentHeight,"dsa")
  }, [toolbarHeight]);
  // useEffect(() => {
  //   console.log(innerHeight, innerWidth, "innerHeight, innerWidth");
  //   const setElementHeight = () => {
  //     const vh = window.innerHeight * 0.01;
  //     const navbarHeight = headNavbarRef.current.clientHeight;
  //     const element = elementRef.current;
  //     // console.log(element,"element",(100 * vh - navbarHeight),"(100 * vh - navbarHeight)")
  //     if (element) {
  //       setHeight(100 * vh - navbarHeight);
  //     }
  //   };
  //   setElementHeight();
  //   window.addEventListener("resize", setElementHeight);
  //   // return () => window.removeEventListener("resize", setElementHeight);
  // }, [innerHeight, innerWidth]);

  return (
    <Fragment>
      {/* navbar */}
      {!isLogin ? (
        <div ref={headNavbarRef}></div>
      ) : (
        <div
          ref={headNavbarRef}
          style={{ height: "45px" }}
          className="bg-dark text-white py-2 px-3 d-flex justify-content-between align-items-center"
        >
          <div className="h4 m-0 cursor-pointer" onClick={goHome}>
            診所管理系統
          </div>
          {!menuIsShow && (
            <div onClick={menuHandler} className="m-0 menu">
              <FontAwesomeIcon icon="fas fa-bars" />
            </div>
          )}
          {menuIsShow && (
            <div onClick={menuHandler} className="m-0 menu">
              <FontAwesomeIcon icon="fas fa-times" />
            </div>
          )}
        </div>
      )}
      {/* main */}
      {!isLogin && (
        <div className="w-100 d-flex " ref={elementRef} style={style}>
          <div className="bg-light h-100 w-100 flex-wrap  ">
            <Route
              exact
              path="/login"
              onEnter={() => window.scrollTo(0, 0)}
              component={UserLogin}
            ></Route>
            <Redirect to="/login" />
          </div>
        </div>
      )}
      {isLogin && (
        <div className="w-100 d-flex " ref={elementRef} style={style}>
          {menuIsShow && (
            <div className="navbar-background" onClick={menuHandler}></div>
          )}

          <div className="h-100 Navbar " style={menuIsShow ? NavbarWidth : {}}>
            <Navbar showMenu={(e) => menuHandler()}></Navbar>
          </div>

          <div className="bg-light h-100 w-100 flex-wrap  RouterWidth">
            <Switch>
              <Route path="/login" component={UserLogin} />

              <Route
                exact
                path="/"
                onEnter={() => window.scrollTo(0, 0)}
                component={Home}
              ></Route>
              <Route
                path="/clinic/:id"
                onEnter={() => window.scrollTo(0, 0)}
                component={ClinicDetail}
              />
              <Route
                path="/approved"
                onEnter={() => window.scrollTo(0, 0)}
                component={Approved}
              />
              <Route
                path="/approved/:id"
                onEnter={() => window.scrollTo(0, 0)}
                component={Approved}
              />
            </Switch>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
