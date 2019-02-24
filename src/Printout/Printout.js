import React, { Component } from 'react';
import './Printout.css';
import { Link } from 'react-router-dom';

class Printout extends Component {
  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenu: this.props.model.returnMenu()

    }
  }
  render() {
    return (
      <div className="Printout col-xs-12">
      <div className="row">
        <div className="col-xs-6">
        </div>
        <div className="col-xs-12 col-xs-6">
            <Link to="/overview"><button id="infoBackToSearch" className="btn btn-primary">Back to overview</button></Link>
        </div>
      </div>
      <hr></hr>
      <br/>
      {this.state.fullMenu.map((menuDish) =>
        <div className='row'>
          <div className='col-xs-12 col-sm-3'>
            <a className='thumbnail'>
              <img src={'https://spoonacular.com/recipeImages/'+menuDish.id+'-240x150.jpg'} alt="..."/>
            </a>
          </div>
          <div className='col-xs-12 col-sm-5'>
            <div>
              <div className='panel-heading'>
                <h3 className='panel-title'>{menuDish.title}</h3>
              </div>
              <div className='panel-body'> {menuDish.extendedIngredients.map((ingredient) =>
                <div>
                  <strong>{ingredient.amount*this.state.numberOfGuests} {ingredient.unit}</strong> {ingredient.name}
                </div>)}
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-4'>
            <div className="panel-heading">  
              <h3 className="panel-title">Preparations</h3>
            </div> 
            <div className='panel-body'>{menuDish.instructions}</div>
          </div>

        </div>
        )}

      </div>
    );
  }
}

export default Printout;
