import React, { useEffect, useState } from "react";
import Nav from "../../Components/Navbar/Navbar";
import "./dashboard.css";
import { Row, Col } from "react-bootstrap";
import Card1 from "../../Components/Card1/Card1";
import CarouselCard from "../../Components/carouselCard/CarouselCard";
import Carousel from "react-bootstrap/Carousel";
import bremont3 from "../Assets/bremont3.png";
import bremont1 from "../Assets/bremont1.png";
import bremont2 from "../Assets/bremont2.png";

function Dashboard() {
  // State to hold Google user info
  const [googleUserInfo, setGoogleUserInfo] = useState({});

  // Log the profile picture URL to the console
  console.log(googleUserInfo.profilePic);

  // UseEffect hook to get the user info from session storage
  useEffect(() => {
    const user = sessionStorage.getItem("existingUser");
    if (user) {
      setGoogleUserInfo(JSON.parse(user));
    }
  }, []);

  return (
    <div id="bodyDiv">
      {/* Navigation bar component */}
      <Nav
        userName={googleUserInfo.userName}
        profilePic={googleUserInfo.profilePic}
      />
      <Row>
        <Col className="col-7 ms-5 ps-5">
          {/* Main heading and subheading */}
          <h1 id="homeHeading">
            This is the time to <br />
            turn yourself into a <br />
            real man
          </h1>
          <p id="homePara">
            Handpicked collection of <span>Collection</span> of premium time
            keepers <br />
            for all purposes and ages.
          </p>
          <div className="d-flex justify-content-between">
            <p id="featured">Featured Products</p>
            <div className="me-5">
              <i className="fa-solid fa-arrow-left mx-2"></i>
              <i className="fa-solid fa-arrow-right mx-2"></i>
            </div>
          </div>
          <div className="d-flex">
            {/* Display featured products */}
            <Card1 image={bremont3} name="Zoro Mindsweep" />
            <Card1 image={bremont1} name="Romelu Authentic" />
            <Card1 image={bremont2} name="Sierra Large Dial" />
          </div>
        </Col>
        <Col>
          {/* Carousel for additional products */}
          <Carousel>
            <Carousel.Item className="mb-5" interval={2000}>
              <CarouselCard image={bremont3} name="Zoro Mindsweep" />
            </Carousel.Item>
            <Carousel.Item className="mb-5" interval={2000}>
              <CarouselCard image={bremont1} name="Bremont Star" />
            </Carousel.Item>
            <Carousel.Item className="mb-5" interval={2000}>
              <CarouselCard image={bremont2} name="Sierra Large" />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
