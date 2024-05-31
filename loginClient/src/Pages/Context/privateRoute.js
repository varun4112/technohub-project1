import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./TokenAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./TokenAuth";

// const PrivateRoute = ({ children, adminOnly = false }) => {
//   const { isAuthenticated, isAdmin } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   if (adminOnly && !isAdmin) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoute;
