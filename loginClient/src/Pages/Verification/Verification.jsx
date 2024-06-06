import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import email from "../Assets/email.png";
import "./verification.css";
import { emailOtpVerificationAPI } from "../../Services/allAPI";
import { useNavigate } from "react-router";

function Verification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(() =>
    JSON.parse(sessionStorage.getItem("email"))
  );
  console.log(userEmail);

  // useEffect((),[])

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is valid
    if (otp.length !== 6) {
      return alert("Invalid OTP. OTP should be 6 digits long.");
    }
    try {
      const userData = {
        email: userEmail,
        otp,
      };
      const result = await emailOtpVerificationAPI(userData);

      if (result.status === 200) {
        alert("Email Verification Successful");
        navigate("/phoneVerification");
      } else {
        console.log(result);
        alert("Verification Failed! Try Again");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      alert("An error occurred during verification. Please try again later.");
    }
  };

  return (
    <>
      <Container>
        <div className="p-5 m-5 text-center">
          {" "}
          <img src={email} height={300} alt="" />
          <h3 className="mb-2">Verify Your Email Address</h3>
          <p>
            We have sent a verification link to your email. <br />
            Please ente OTP to complete verification
          </p>
          <input
            id="otpInput"
            type="number"
            className="w-50"
            placeholder="Enter 6-Digit OTP Here"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <br />
          <button className="btn btn-outline-success" onClick={handleOtpSubmit}>
            Submit OTP
          </button>
          <p id="resendOtp">Resend OTP</p>
        </div>
      </Container>
    </>
  );
}

export default Verification;
