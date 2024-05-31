import React from "react";
import bretmont from "../Asset/bremont-s302-blue-green-rubber-strap-watch-peter-jackson-removebg-preview.png";
import "./carouselCard.css";
import { Col, Row } from "react-bootstrap";

function CarouselCard(props) {
  return (
    <>
      <div className="carouselCardBody">
        <div className="py-4 px-3  me-5" id="carouselInfo">
          <Row>
            <Col className="col-8">
              <div id="productInfo">
                <h4 id="productInfoHeading">{props.name}</h4>
                <p id="productInfoPrice">$.179</p>
              </div>
            </Col>
            <Col>
              <button id="carouselButton" className="px-3 py-1 my-3">
                Buy Now
              </button>
            </Col>
          </Row>
        </div>
        <div className="carouselimg">
          <img id="carouselImage" src={props.image} alt="" />
        </div>
      </div>
    </>
  );
}

export default CarouselCard;
