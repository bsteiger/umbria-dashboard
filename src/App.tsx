import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Error404 from "./components/error404";
import BridgeVolumeAll from "./dashboards/bridgeVolume/BridgeVolumeAll";
import Test from "./components/Test";
import Overview from "./dashboards/Overview";
import UmbrPools from "./dashboards/UmbrPools/UmbrPools";
import Footer from "./components/Footer";
import Profile from "./dashboards/Profile";
import { Web3ContextProvider } from "./context/Web3Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  render() {
    return (
      <Web3ContextProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path={"/umbrPools"} element={<UmbrPools />} />
            <Route path="/profile/:address" element={<Profile />}></Route>
            <Route
              path={"/network/bridgevolume/"}
              element={<BridgeVolumeAll />}
            />
            <Route path={"/test"} element={<Test />}></Route>
            <Route path={"/error404"} element={<Error404 />} />
            <Route path={"/"} element={<Overview />} />
            <Route path="*" element={<Navigate replace to="/error404" />} />
          </Routes>
          <Footer />
          <ToastContainer
            hideProgressBar
            position="bottom-right"
            autoClose={2000}
          />
        </div>
      </Web3ContextProvider>
    );
  }
}

export default App;
