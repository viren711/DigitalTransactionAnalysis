import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Dataset1 from "./pages/Dataset1";
import Dataset2 from "./pages/Dataset2";
import Dataset3 from "./pages/Dataset3";
import Predictions from "./pages/Predictions"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Common elements like a navbar or sidebar */}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dataset1" element={<Dataset1 />} />
          <Route path="/dataset2" element={<Dataset2 />} />
          <Route path="/dataset3" element={<Dataset3 />} />
          <Route path="/predictions" element={<Predictions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
