import React from "react";
import logo from "../assets/marelablogo.webp";

function ProposalLogo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="Marelab Services"
      className={`object-contain ${className}`}
    />
  );
}

export default ProposalLogo;