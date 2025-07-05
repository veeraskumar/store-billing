import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "../components/Admin";
import BillingColumns from "../components/BillingColumns";
import Navbar from "../components/Navbar";

const SalesDashBoard = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BillingColumns />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SalesDashBoard;
