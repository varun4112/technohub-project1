import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../../Services/allAPI";
import "./register.css";
import LoginImageRight from "../Assets/Saly-14loginRightImage.png";
import facebook from "../Assets/Facebook.png";
import google from "../Assets/google.png";
import apple from "../Assets/apple.png";

function Register() {
  const [regData, setRegData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { userName, email, password } = regData;
    if (!userName || !email || !password || !confirmPassword) {
      alert("Enter All Feilds");
    } else if (password != confirmPassword) {
      alert("Passwords Does not match! Please Try Again");
    } else {
      const result = await registerAPI(regData);
      if (result.status == 200) {
        alert("Registration Successfull");
        setRegData({
          userName: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        console.log(result.status);
        alert(result.response.data);
      }
    }
  };

  return (
    <div className="rootDiv">
      <div className="brandNav">
        <p id="navLogo">Your Logo</p>
      </div>
      <Container>
        <Row>
          <Col>
            <div id="regDiv" style={{ width: "369px", textAlign: "center" }}>
              <h3 id="headingLeft"> Sign Up</h3>
              <input
                type="text"
                placeholder="Enter Email"
                value={regData.email}
                onChange={(e) => {
                  setRegData({ ...regData, email: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="Create User Name"
                value={regData.userName}
                onChange={(e) => {
                  setRegData({ ...regData, userName: e.target.value });
                }}
              />

              <input
                type="password"
                placeholder="Password"
                value={regData.password}
                onChange={(e) => {
                  setRegData({ ...regData, password: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button id="regButton" onClick={handleRegister}>
                Register
              </button>
              <p id="paraLeft">or continue with</p>
              <div id="regCompanies">
                <div>
                  <img
                    className="regCompanyLogos"
                    src={facebook}
                    alt="facebook"
                  />
                </div>
                <div>
                  <img className="regCompanyLogos" src={apple} alt="apple" />
                </div>
                <div>
                  <img className="regCompanyLogos" src={google} alt="google" />
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <h1 id="h1Left">Sign Up to</h1>
            <h3 id="h3Right">Lorem Ipsum is simple</h3>
            <p id="p1right" className="mt-5">
              If you already have an account
            </p>
            <p id="p2right">
              You can{" "}
              <Link to="/" id="span1right">
                Login here !
              </Link>
            </p>
            <img src={LoginImageRight} id="LoginImageRight" alt="login Image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
