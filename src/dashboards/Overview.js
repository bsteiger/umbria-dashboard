import React, { setState, useState, useEffect } from "react";
import UmbrPrice from "../components/umbrprice";
/** Overview Dashboard Page
 *
 * Displays:
 * - Current UMBR Price
 * - Table of apys for each network from the UMBR Endpoint
 */
function Overview() {
  const [umbrPrice, setUmbrPrice] = useState("");

  useEffect(() => {
    setUmbrPrice(100);
  }, []);

  return (
    <React.Fragment>
      <UmbrPrice price={umbrPrice} />
    </React.Fragment>
  );
}

export default Overview;
