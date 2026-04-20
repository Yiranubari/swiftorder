import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import GeneratorPage from "./pages/GeneratorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GeneratorPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
