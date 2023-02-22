// import Login from "./pages/login";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import { Switch, Route, Redirect } from "react-router-dom";
import ClinicDetail from "./component/home/clinic-detail";
import Approved from "./pages/approved";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserLogin from "./pages/login";
import "./scss/App.scss"
const NavbarWidth = {
  left: `0`
  // overflow: "unset"
}
const RouterWidth = {
  width: `80%`,
  overflowY: `scroll`
}
function App() {
  const initHeight = `${window.innerHeight}`;
  const [height, setHeight] = useState(initHeight);
  const [menuIsShow, setMenuIsShow] = useState(false);

  let headNavbarRef = useRef()
  const style = {
    height: `${height}px`
  }
  const menuHandler = () => {
    setMenuIsShow(!menuIsShow)
    console.log(menuIsShow, "menu")
  }

  useEffect(() => {
    const headNavbarRefDOM = headNavbarRef.current;
    const height = headNavbarRefDOM.clientHeight;
    setHeight(window.innerHeight - height);
    const handleResize = () => {

      // console.log(height,"height")
      setHeight(window.innerHeight - height);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // if (isLogin) {
  //   return (
  //     <Route path="/login" component={UserLogin}> </Route>
  //   //  <Redirect exact from="/" to="/login" />
  //   )
  // }

  return (
    <Fragment>
      <div ref={headNavbarRef} className="bg-dark text-white py-2 px-3 d-flex justify-content-between align-items-center">
        <div className="h4 m-0">iCare_CRM</div>
        <div onClick={menuHandler} className="m-0 menu"><FontAwesomeIcon icon="fas fa-bars" /></div>
      </div>
      <div className="w-100 d-flex " style={style}>
        <div className="bg-dark h-100 Navbar"   style={menuIsShow?NavbarWidth :{}}>
          <Navbar></Navbar>
        </div>

        <div className="bg-light h-100 d-flex align-items-center flex-wrap flex-column  RouterWidth">
          <Switch>
            <Route exact path="/" component={Home} >

            </Route>
            <Route path="/clinic_Detail/:id" component={ClinicDetail} />
            <Route path="/approved" component={Approved} />
            <Route path="/approved/:id" component={Approved} />
            {/* 核可 */}
            {/* 核可細節 */}
            {/* 搜尋細節 */}

          </Switch>
        </div>
      </div>
    </Fragment>
  )
}

export default App;
