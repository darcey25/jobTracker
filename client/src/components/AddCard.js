import React, { Component } from "react";
import './style.css'
import SmallCard from './SmallCard';
import AddCardModal from './AddCardModal';



class AddCard extends Component {
  state = {
    cards: []
  };

  	handleAddCard = event => {
	console.log("click");
	return (<SmallCard/>)
};

render() {
	return (
<div>
<AddCardModal/>
  </div>
  )
}

}

export default AddCard;
