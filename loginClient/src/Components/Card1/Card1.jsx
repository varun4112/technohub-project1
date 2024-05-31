import React from "react";
import "./card1.css";

function Card1({ image, name }) {
  return (
    <>
      <div id="cardBox" className="p-3 me-3">
        <div>
          <img id="cardImg" src={image} alt="" />
        </div>
        <div>
          <h5 id="cardHeading1">{name}</h5>
          <p id="cardPara1">$169</p>
          <button id="cardButton" className="px-3 py-1">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}

export default Card1;
