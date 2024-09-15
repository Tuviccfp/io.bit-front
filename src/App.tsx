import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ProfileComponent from "./components/Profile";
import Cookies from "js-cookie";
import GoalsComponent from "./components/Goals";

function App() {
  const isAuthenticated = Cookies.get("Authorization");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {isAuthenticated && (
          <>
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/goals-page" element={<GoalsComponent />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
