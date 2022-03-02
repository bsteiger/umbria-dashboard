import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";

export function SortDownIcon({ ...props }) {
  return <FontAwesomeIcon {...props} icon={faSortDown} />;
}
export function SortUpIcon({ ...props }) {
  return <FontAwesomeIcon {...props} icon={faSortUp} />;
}

export function GitHubIcon({ ...props }) {
  return <FontAwesomeIcon {...props} icon={faGithub} />;
}
