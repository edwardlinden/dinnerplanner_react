import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenu: this.props.model.returnMenu()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount = () => {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenu: this.props.model.returnMenu()

    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };


  render() {
    function onPlusButton(){
      this.props.model.setNumberOfGuests(this.props.model.getNumberOfGuests()+1)
      console.log("plus")
    }
    function onMinusButton(){
      this.props.model.setNumberOfGuests(this.props.model.getNumberOfGuests()-1)
      console.log("minus")
    }
    function onRemoveDish(id){
      this.props.model.removeDishFromMenu(id)
    }

    return (

      <div className="col-sm-3 borderline">
        <div className="sidebar-nav">
          <div className="navbar" role="navigation">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                <span className="glyphicon glyphicon-menu-hamburger"></span>
              </button>
              <span className="visible-xs navbar-brand">My dinner</span>
            </div>
            <div className="navbar-collapse collapse sidebar-navbar-collapse">
              <ul className="nav nav nav-stacked">

                <li className="active">
                  <h4>My dinner</h4>
                  <h5>People:</h5>
                  <div className="input-group number-spinner col-xs-1 left">
                    <span className="input-group-addon" onChange={this.onNumberOfGuestsChanged}>{this.state.numberOfGuests}</span>

                    <span className="input-group-btn">
                      <button onClick={onMinusButton.bind(this)} type="button"className="btn btn-default" ><span className="glyphicon glyphicon-minus"></span></button>
                    </span>
                    <span className="input-group-btn">
                      <button onClick={onPlusButton.bind(this)} type="button"className="btn btn-default" ><span className="glyphicon glyphicon-plus"></span></button>
                    </span>
                  </div>
                </li>
                <div>
                  <hr></hr>
                  <div className="col-xs-12">
                    <div className="col-xs-8" >Dish name</div>
                    <div className="col-xs-4" >Cost</div>
                  </div>

                  <br></br>
                </div>
                <li>

                  <div className="col-xs-12">{
                    this.state.fullMenu.map((menuDish) =>


                    <div className="alert alert-warning alert-dismissible" id="dishNameSpan"role="alert">
                     <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onRemoveDish.bind(this, menuDish.id)}>&times;</button>
                     <strong>{menuDish.servings*this.state.numberOfGuests} SEK </strong> - {menuDish.title}
                     </div>
                     )

                  }

                  </div>
                </li>
                <br></br>
                <hr></hr>
                <div className="col-xs-12 littlebutton">
                  <Link to="/overview"><button className="btn btn-primary btn-sm">Confirm</button></Link>
                  <br></br>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Sidebar;