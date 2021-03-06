import React, { Component } from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';


class Overview extends Component {
  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenu: this.props.model.returnMenu()

    }
  }
  componentDidMount = () => {
    this.props.model.addObserver(this)
    console.log(this.state.fullMenu);
  }
  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenu: this.props.model.returnMenu()

    })
  }
  render() {

    return (
      <div className="col-xs-12">
      <div className="row">
        <div className="col-xs-6">
          <h4>My dinner: {this.state.numberOfGuests} people</h4>
        </div>
        <div className="col-xs-12 col-xs-6">
            <Link to="/search"><button id="infoBackToSearch" className="btn btn-primary" >Back to edit dinner</button></Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <hr/>
        </div>
        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">
        {this.state.fullMenu.map((menuDish) =>
          <div className='col-sm-4'>
            <a className='thumbnail'>
                <img src={'https://spoonacular.com/recipeImages/'+menuDish.id+'-240x150.jpg'} alt="..."></img>
              <div className='caption'>
                <span>{menuDish.title}</span>
                <span id="overviewPrice">{menuDish.servings*this.state.numberOfGuests+' SEK'}</span>
              </div>
            </a>

          </div>

        )}

        </div>
        <div className="col-sm-3">       
          <div className="col-sm-11">
            <div>Total: SEK </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="col-sm-12" id="printInfo">
        <Link to="/printout"><button id="printFullRecipe"type="button" className="btn btn-primary">Print Full Recipe</button></Link>
      </div>
    </div>
    );
  }
}

export default Overview;
