import React from "react";

import IconNames from ".";

export default function Icon({ name }) {
  const Component = IconNames[name];
  return <Component />;
}
