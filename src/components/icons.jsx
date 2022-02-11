import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function SortDownIcon() {
  return <FontAwesomeIcon icon={faSortDown} />;
}
export function SortUpIcon() {
  return <FontAwesomeIcon icon={faSortUp} />;
}
