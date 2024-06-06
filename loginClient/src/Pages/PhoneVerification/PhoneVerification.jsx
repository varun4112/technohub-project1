import React from "react";
import mobile from "../Assets/mobile.png";
import { Container } from "react-bootstrap";
import "./phoneVerification.css";

function PhoneVerification() {
  return (
    <>
      <Container>
        <div className="p-5 m-5 text-center">
          {" "}
          <img src={mobile} height={300} alt="" />
          <h3 className="mb-2">Verify Your Phone Number</h3>
          <p>Enter the verification code we have sent to your number</p>
          <input
            id="otpInput"
            type="number"
            className="w-50"
            placeholder="Enter OTP Here"
          />
          <br />
          <button className="btn btn-outline-success">Submit OTP</button>
        </div>
      </Container>
    </>
  );
}

export default PhoneVerification;
