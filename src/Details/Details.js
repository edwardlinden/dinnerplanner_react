import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import modelInstance from '../data/DinnerModel';
import loader from '../loader.gif';


class Details extends Component {
  constructor(props){
    super(props)

    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      currentDish: this.props.model.getCurrentDish(),
      status: 'LOADING'
    };
  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render

    let id = "";
    this.props.model.addObserver(this)
    id = this.state.currentDish

    this.props.model.getDish(id).then(dish => {
      this.setState({
        status: 'LOADED',
        dish: dish
      });
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });
    });
  }
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      currentDish: this.props.model.getCurrentDish()
    });
  }

  onClickAdd(param, e) {
    modelInstance.addDishToMenu(param);
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value)
  }

  render() {
    let name = null;
    let image = null;
    let instructions = null;
    let ingredients = null;
    let price = null;

    switch (this.state.status) {
      case 'LOADING':
      instructions = <img src={loader} alt="..."></img>
        break;
        
      case 'LOADED':
      name = this.state.dish.title
      image = <img src={'https://spoonacular.com/recipeImages/'+this.state.dish.id+'-240x150.jpg'}alt="..."></img>
      instructions = this.state.dish.instructions
      price = this.state.dish.servings
      console.log(this.state.dish)
      ingredients = this.state.dish.extendedIngredients.map( (ingredient) =>

        <tr>
          <td id='ingrnum'>{ingredient.amount*this.state.numberOfGuests} {ingredient.unit}</td>
          <td>{ingredient.name}</td>
          <td id='ingrnum'>{ingredient.amount*this.state.numberOfGuests}</td>
          <td>SEK</td>
        </tr>
      )


        break;
      default:
      instructions = <b> Failed to load data...</b>
        break;
    }
    return (
    <div>
      <Sidebar model={this.props.model}/>
      <div id="dishDetailView" className="col-sm-9">
        <div className="row borderline">
          <div className="col-xs-12 col-sm-6">
            <h4>{name}</h4>
            <div className="padding-header-left"><a>{image}</a></div>
            <Link to="/search"><button className="btn btn-primary btn-sm">Back to search</button></Link>
            <br></br>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div>
              <div className="padding-header-left">  INGREDIENTS FOR {this.state.numberOfGuests} PEOPLE </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Ingredient</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {ingredients}
                </tbody>
              </table>
              <div className="footer">
                <button className="btn btn-primary btn-sm pull-left" onClick={this.onClickAdd.bind(this, this.state.dish)}>Add to menu</button>
                <div className="pull-right redcolor">{price*this.state.numberOfGuests} SEK </div>
              </div>
              <br></br>
              <br></br>

            </div>
          </div>
        </div>
        <div className="borderline">
          <div className="panel-heading"><h3 className="panel-title">Preparations</h3></div>
          <div className="panel-body">{instructions}</div>
        </div>
      </div>
  </div>

    );
  }
}

export default Details;
