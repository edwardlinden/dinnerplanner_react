import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: this.props.model.getType(),
      filter: this.props.model.getFilter(),
      status: 'INITIAL'
    }
  }


  render() {
    return (
      <div className="SelectDish">
        <h2>This is the Select Dish screen</h2>

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model} />
        <Dishes />
      </div>
    );
  }
}

export default SelectDish;



// nytt


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


        <div id="pageView">
          <div className="col-sm-9">
            <h4>Find a dish</h4>
            <div className="input-group col-xs-12">
              <input id="searchFilter" type="text" className="form-control" placeholder="Search for..." onChange={this.onFilterChanged}/>

              <span className="input-group-btn">

              <select id="dishType" className="form-control" onChange={this.onTypeChanged}>
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
              <button className="btn btn-default" type="button">Search</button>

              </span>

              <span className="input-group-btn">
                 <button  className="btn btn-default" type="button">Search</button>
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
