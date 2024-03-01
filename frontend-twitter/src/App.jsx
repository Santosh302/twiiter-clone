import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import CreateTweet from "./Components/createTweet";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";


import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  const user = {
    name: "John Doe",
    username: "john_doe",
    bio: "Web Developer | React Enthusiast",
    profilePicture: "https://source.unsplash.com/150x150/?portrait",
    
  };

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile user={user} />} />
        <Route path="/createTweet" element={<CreateTweet />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        {/* Default route */}
        
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
}

export default App;
