import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">

      {/* Welcome View */}
			<div className="container centerit">
				<div className="centerhorizont">
					Dinner usually refers to the most significant meal of the day, 
					which can be at noon or in the evening. However, the term "dinner" 
					can have different meanings depending on culture, as it may mean a 
					meal of any size eaten at any time of day. Historically, it referred 
					to the first meal of the day eaten around noon, and is still sometimes
					used for a noon-time meal, particularly if it is a large or main meal. 
					In many parts of the Western world, dinner is taken as the evening meal.
				</div>
        <br></br>
        <Link to="/search">
          <button type="button" className="btn btn-primary">Create new dinner and accept cookies</button>
        </Link>
          
			</div> 

      </div>
    );
  }
}

export default Welcome;
