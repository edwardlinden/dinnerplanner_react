import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  constructor(props) {
    super(props)
debugger;
    this.state = {
      type: this.props.model.getType(),
      filter: this.props.model.getFilter(),
      status: 'LOADING'
    }
  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.addObserver(this)
  }
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

    onTypeChanged = (e) => {
      this.props.model.setType(e.target.value)

    }

    onFilterChanged = (e) => {
debugger;
      this.props.model.setFilter(e.target.value)
    }

  update() {
    this.setState({
      type: this.props.model.getType(),
      filter: this.props.model.getFilter(),
    })

  }


  render() {
    return (
      <div className="SelectDish">


        {/* We pass the model as property to the Sidebar component
          Flytta över sökfältet till denna ist */}
        <Sidebar model={this.props.model}/>


        <div >
          <div className="col-sm-9 borderline" >
            <h4>Find your dinner</h4>
            <div className="input-group col-xs-12">
              <input type="text" className="form-control" placeholder="Search..." onChange={this.onFilterChanged}/>

              <span className="input-group-btn input-mysize">

              <select className="form-control" onChange={this.onTypeChanged}>
                <option value="">All</option>
                <option value="antipasti">Antipasti</option>
                <option value="beverage">Beverage</option>
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="condiment">Condiment</option>
                <option value="dessert">Dessert</option>
                <option value="dip">Dip</option>
                <option value="drink">Drink</option>
                <option value="starter">Starter</option>
                <option value="main dish">Main dish</option>
                <option value="morning meal">Morning meal</option>
                <option value="salad">Salad</option>
                <option value="snack">Snack</option>
                <option value="side dish">Side dish</option>

              </select>
              </span>
              <span className="input-group-btn">
                 <button  className="btn btn-default" type="button">Go!</button>
              </span>

            </div>
            <br></br>


            <div id="dishView">
            <Dishes/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
