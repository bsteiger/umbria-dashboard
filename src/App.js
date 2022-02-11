import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
import Error404 from "./components/error404";
import BarChart from "./components/chartTest";
import BridgeVolumeAll from "./dashboards/bridgeVolume/bridgeVolumeAll";
import Test from "./components/Test";
import Overview from "./dashboards/Overview";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path={"/chartTest/Donut"} exact component={BarChart} />
          <Route path={"/"} exact component={Overview} />
          <Route path={"/network/bridgevolume/"} component={BridgeVolumeAll} />
          <Route path={"/test"} component={Test}></Route>
          <Route path={"/error404"} exact component={Error404} />
          <Redirect to={"/error404"} />
        </Switch>
      </div>
    );
  }
}

export default App;
