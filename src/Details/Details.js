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
          <td>SEK</td>
          <td id='ingrnum'>{ingredient.amount*this.state.numberOfGuests}</td>
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
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="panel panel-default">
              <div className="panel-body"><h3>{name}</h3></div>
            </div>
            <a id="img" className='thumbnail'>{image}</a>
            <Link to="/search"><button id="backtoselectdish"type="button"className="btn btn-primary col-xs-6">Back to search</button></Link>
            <br></br>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="panel panel-primary">
              <div id="numberOfGuestsIngredients"className="panel-heading">  Ingredients for {this.state.numberOfGuests} personas</div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Ingredient</th>
                    <th></th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody id="dishIngredients">
                {ingredients}
                </tbody>
              </table>
              <hr></hr>
              <div className="footer">
                <button id="addtomenu"type="button"className="btn btn-primary col-xs-6" onClick={this.onClickAdd.bind(this, this.state.dish)}>Add to menu</button>
                <div id="totCostDish" className="col-xs-6">{price*this.state.numberOfGuests} SEK </div>
              </div>
              <br></br>
              <br></br>

            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading"><h3 id="headingName"className="panel-title">{name}</h3></div>
          <div className="panel-body">{instructions}</div>
        </div>
      </div>
  </div>

//
//       <div id="detail" classNameNameName="col-sm-12">
//       <h1>{name}</h1>
//     <p>{instructions}</p>
//     {image}
//
// {ingredients}
//
//       </div>


    );
  }
}

export default Details;
