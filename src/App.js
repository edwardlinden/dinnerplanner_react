import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Details from "./Details/Details";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
        <hr></hr>
      
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route path="/search" render={() => <SelectDish model={modelInstance} />}/>
          <Route path={"/details"} render={() => <Details model={modelInstance}/>}/>
          <Route path={"/overview"} render={() => <Overview model={modelInstance}/>}/>
          <Route path={"/printout"} render={() => <Printout model={modelInstance}/>}/>
        </header>
      </div>
    );
  }
}

export default App;
