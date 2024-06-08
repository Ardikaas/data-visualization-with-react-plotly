import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import InputData from "./pages/InputData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/input" element={<InputData />} />
      </Routes>
    </Router>
  );
}

export default App;
