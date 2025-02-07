import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { WalletProvider } from "./data/wallet";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProvider>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </Router>
      <Footer />
    </WalletProvider>
  </StrictMode>
);
