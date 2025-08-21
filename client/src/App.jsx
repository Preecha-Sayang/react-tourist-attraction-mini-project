import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./component/homepage";
    

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
)}

export default App;
