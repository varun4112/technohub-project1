import React, { useEffect, useState } from "react";
import mobile from "../Assets/mobile.png";
import { Container } from "react-bootstrap";
import "./phoneVerification.css";
import {
  generatePhoneOtpAPI,
  phoneOtpVerificationAPI,
} from "../../Services/allAPI";
import { useNavigate } from "react-router";

function PhoneVerification() {
  const [userPhone, setUserPhone] = useState(() =>
    JSON.parse(sessionStorage.getItem("phone"))
  );

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleGeneratePhoneOtp(userPhone);
  }, []);

  const handleGeneratePhoneOtp = async (phone) => {
    console.log("inside potp");
    try {
      const result = await generatePhoneOtpAPI({ phone });
      console.log(result);
      if (result.status === 200) {
        alert("OTP Successfully Generated");
      }
    } catch (err) {
      console.error("OTP generation failed", err);
      alert("An error occurred during verification. Please try again later.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    // check otp length
    if (otp.length !== 6) {
      return alert("Invalid OTP. OTP should be 6 digits long.");
    }

    try {
      const userData = {
        phone: userPhone,
        otp,
      };
      const result = await phoneOtpVerificationAPI(userData);
      if (result.status === 200) {
        alert("Phone Number Verification Successful");
        navigate("/");
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
          <img src={mobile} height={300} alt="" />
          <h3 className="mb-2">Verify Your Phone Number</h3>
          <p>Enter the verification code we have sent to your number</p>
          <input
            id="otpInput"
            type="number"
            className="w-50"
            placeholder="Enter OTP Here"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <br />
          <button className="btn btn-outline-success" onClick={handleOtpSubmit}>
            Submit OTP
          </button>
          <p id="resendOtp" onClick={handleGeneratePhoneOtp}>
            Resend OTP
          </p>
        </div>
      </Container>
    </>
  );
}

export default PhoneVerification;
