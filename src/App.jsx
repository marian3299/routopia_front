import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import TourDetail from "./routes/TourDetail";
import Footer from "./components/Footer";
import Category from "./routes/Category";
import FormTour from "./routes/FormTour";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/new-tour" element={<FormTour />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
