import React from "react";
import Image from "../Images/Images";

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        <img
          className="img-fluid"
          src={Image.ecomLogo}
          style={{ maxHeight: "30px" }}
          alt="E-com"
        />
      </h3>
    </div>
  );
};

export default Footer;
