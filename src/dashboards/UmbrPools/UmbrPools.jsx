import React from "react";

function UmbrPools() {
  return (
    <div className="overview-page">
      <div className="container">
        <div className="row mt-2">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">UMBR Staking Rewards</h5>
                <p className="card-subtitle mb-2">
                  Estimated rewards for staking UMBR (broken down by asset)
                </p>
                <DemoChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UmbrPools;

function DemoChart() {
  return <h1>📊⬅️chart go here</h1>;
}
