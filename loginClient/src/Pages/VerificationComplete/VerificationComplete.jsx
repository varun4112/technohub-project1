import React from "react";
import { Container } from "react-bootstrap";
import checkMark from "../Assets/checkmark.png";
import { useNavigate } from "react-router";

function VerificationComplete() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="p-5 m-5 text-center">
          {" "}
          <img src={checkMark} height={300} alt="" />
          <h3 className="mb-2">Verification Complete</h3>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              navigate("/");
            }}
          >
            Login to continue
          </button>
        </div>
      </Container>
    </>
  );
}

export default VerificationComplete;
