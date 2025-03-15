import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import ElectricGuitars from "./ElectricGuitars";
import AcousticGuitars from "./AcousticGuitars";
import "./App.css";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  // Set background class based on the current page
  const backgroundClass = location.pathname === "/" ? "home-background" : "normal-background";

  return (
    <div className={backgroundClass}>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electric-guitars" element={<ElectricGuitars />} />
          <Route path="/acoustic-guitars" element={<AcousticGuitars />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;