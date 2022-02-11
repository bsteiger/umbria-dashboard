import React from "react";

function UmbrPrice({ price }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">${price > 0 ? price.toFixed(2) : " -- "}</h5>
        <h6 className="card-subtitle mb-2">UMBR Price</h6>
      </div>
    </div>
  );
}

export default UmbrPrice;
