import { useState } from "react";
import "../App.css";
import brandlogo from "../assets/M9t6b801.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dateTme, setDateTme] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTme(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="nav">
      <div className="store-details">
        <div className="logo">
          <img src={brandlogo} alt="Brand Logo" className="img-logo" />
        </div>
        <div className="date">
          <h3>{dateTme.toDateString()}</h3>
          <h3>{dateTme.toLocaleTimeString()}</h3>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
