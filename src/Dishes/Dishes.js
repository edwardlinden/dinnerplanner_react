import React, {Component} from 'react';
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from '../data/DinnerModel';
import './Dishes.css';
import { Link } from 'react-router-dom';
import loader from '../loader.gif';

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      type: modelInstance.getType(),
      filter: modelInstance.getFilter(),
      status: 'LOADING'
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this)
    modelInstance.getAllDishes().then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      });
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });
    });

  }
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  onClickDish(param, e) {
    modelInstance.setCurrentDish(param);
  }

  update() {
    this.setState({
      type: modelInstance.getType(),
      filter: modelInstance.getFilter(),
    })
    this.componentDidMount();
  }

  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'LOADING':
        dishesList = <img src={loader} alt="..."></img>

        break;
      case 'LOADED':
        dishesList = this.state.dishes.map((dish) =>

        <div id={dish.id} key={dish.id} className='col-sm-12 col-md-3' >
            <Link to={"/details"}>
              <div className='thumbnail' id={dish.id} onClick={this.onClickDish.bind(this, dish.id)}>
                <img src={'https://spoonacular.com/recipeImages/'+dish.id+'-240x150.jpg'} alt="..."></img>
                <div id="dishCation"className='caption'>
                  <p>{dish.title}</p>
                </div>
              </div>
            </Link>
          </div>

        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }



    return (

      <div>
          {dishesList}
      </div>




    );
  }
}

export default Dishes;
