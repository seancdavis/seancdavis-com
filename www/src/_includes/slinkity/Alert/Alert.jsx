import React, { useState, useEffect } from "react";
import classnames from "classnames";

// TODO:
//
// - [x] Add icon component.
// - [ ] Remove duplicate SVGs and fix usage throughout the project.
// - [ ] Fix the styling. I think there's a padding issue.
// - [ ] Render the alert from copy button and test.
// - [ ] Remove alert from the foot(er)
// - [ ] Adjust (or remove) the readme and old files

import Icon from "../Icon/Icon";

export default function Alert({ text }) {
  const [slideIn, setSlideIn] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  const handleSlideOut = () => {
    setSlideOut(true);
    setSlideIn(false);
  };

  useEffect(() => {
    setSlideIn(true);
    setTimeout(handleSlideOut, 3000);
  }, []);

  return (
    <div
      className={classnames(
        "component--alert p-6 bg-blue text-white fixed shadow-md ml-4",
        { "slide-in": slideIn, "slide-out": slideOut }
      )}>
      <div className="component--alert--grid grid gap-6">
        <p className="mb-0 max-w-sm">{text}</p>
        <button className="w-4" onClick={handleSlideOut}>
          <Icon name="cancel" />
          <span className="visible-hidden">close</span>
        </button>
      </div>
    </div>
  );
}
