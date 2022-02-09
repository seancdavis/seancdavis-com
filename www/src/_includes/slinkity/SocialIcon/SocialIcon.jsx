import React, { useState, useEffect } from "react";
import classnames from "classnames";

import Icon from "../Icon/Icon";

export default function SocialIcon({
  classes = "",
  icon,
  theme = "default",
  url,
}) {
  return (
    <a
      href={url}
      className={classnames(
        "component--social-link",
        `theme-${theme}`,
        classes
      )}>
      <Icon name={icon} />
      <span className="visible-hidden">{icon}</span>
    </a>
  );
}
