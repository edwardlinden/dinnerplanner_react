import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/56";
const httpOptions = {
  headers: { "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767" }

  
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = parseInt(localStorage.getItem("numberOfGuests"), 10)|| 4;

    this.getNumberOfGuests();

    this._currentDish = localStorage.getItem("currentDish") || "";
    this.menu = JSON.parse(localStorage.getItem("menu")) || [];
    this.filter = localStorage.getItem("filter") || "";
    this.type = localStorage.getItem("type") || "";  
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

//Adds a dish to menu
  addDishToMenu(dish) {
    this.menu.push(dish);
    localStorage.setItem("menu", JSON.stringify(this.menu));
    this.notifyObservers();
  };
//Removes a dish from menu
  removeDishFromMenu(id) {
    for(var i = 0; i < this.menu.length; i++){
      if(this.menu[i].id === id){
        this.menu.splice(i, 1);
      }
    }
    localStorage.setItem("menu", JSON.stringify(this.menu));
    this.notifyObservers();
  };

    // Set a current dish
  setCurrentDish(id) {
    this._currentDish = id;
    this.localStorage.setItem("currentDish", this._currentDish);
    this.notifyObservers();
    };
  
  //Returns the current dish HÄRMAPA SETCURRENT PÅ ID KANSKE?
  getCurrentDish() {
      return this._currentDish;
    };

//Returns menu
  returnMenu() {
    return this.menu;
}

  setFilter(f) {
    this.filter = f
    localStorage.setItem("filter", this.filter);
    this.notifyObservers();
}
  getFilter() {
    return this.filter;
}
  setType(t) {
    this.type = t;
    localStorage.setItem("type", this.type);
    this.notifyObservers();

}
  getType() {
    return this.type;
}

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */


  getDish(id) {
    const url = `${BASE_URL}/recipes/`+id+'/information';
    return fetch(url, httpOptions).then(this.processResponse);
      // .catch(handleError)

  }

  getAllDishes() {
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
