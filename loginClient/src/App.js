import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./Pages/Context/TokenAuth";
import PrivateRoute from "./Pages/Context/privateRoute";
import AdminHome from "./Pages/AdminHome/AdminHome";
import Verification from "./Pages/Verification/Verification";
import VerificationComplete from "./Pages/VerificationComplete/VerificationComplete";
import PhoneVerification from "./Pages/PhoneVerification/PhoneVerification";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="verificationComplete"
              element={<VerificationComplete />}
            />
            <Route path="emailVerification" element={<Verification />} />
            <Route path="phoneVerification" element={<PhoneVerification />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminHome />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
