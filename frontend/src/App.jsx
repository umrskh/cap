import { Routes, Route, BrowserRouter } from "react-router-dom";


import Dashboard from "./pages/dashboard";
import Labour from "./pages/labour";
import Customer from "./pages/Customer";
import Material from "./pages/Material";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/labour" element={<Labour/>} />
        <Route path="/customers" element={<Customer/>} />
        <Route path="/materials" element={<Material/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
