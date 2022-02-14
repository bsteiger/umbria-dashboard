import React from "react";
/** Returns a group of buttons buttons are a list of objs with value and text properties */
function ButtonGroup({ buttons, onClick, activeValue }) {
  return (
    <div className="btn-group" role="group">
      {buttons.map((button) => (
        <button
          key={button.text + button.value}
          value={button.value}
          onClick={(e) => onClick(e.target.value)}
          type="button"
          className={[
            "btn btn-secondary",
            button.value === activeValue ? "active" : "",
          ].join(" ")}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;
