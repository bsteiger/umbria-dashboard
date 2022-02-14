import React from "react";
import { SortDownIcon, SortUpIcon } from "./icons";
import { useState } from "react";

/** Test space for pages */
export default function Test(props) {
  const [sort, setSort] = useState("");
  function handleClick() {
    console.log("Clicked");
    if (sort === "") {
      setSort("up");
      return;
    }
    setSort(sort === "up" ? "down" : "up");
  }
  return (
    <div>
      <h1 style={{ cursor: "pointer" }} onClick={handleClick}>
        🎙️Testing 🎙️
        {sort && (sort === "up" ? <SortUpIcon /> : <SortDownIcon />)}
      </h1>
    </div>
  );
}
