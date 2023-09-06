import "./App.css";
// import Navbar from "./components/nav/nav";

// // import Manage from "./components/tasks/manage";
// import Posts from "./components/tasks/update";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashoboard from "./components/dashboard";
import Login from "./comp/login";
import Project from "./comp/project";
function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Project />} />
          <Route path="/manage" element={<Dashoboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
