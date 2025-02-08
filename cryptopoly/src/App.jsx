import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Market from "./pages/Market";
import AddHouse from "./pages/addHouse";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { WalletProvider } from "./context/walletContext";
import Profile from "./pages/Profile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/add-house" element={<AddHouse />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </WalletProvider>
  </StrictMode>
);
