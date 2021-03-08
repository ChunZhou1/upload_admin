import React from "react";

import { Header } from "./component/public_component";

import { Foot_container } from "./component/public_component";

export function Public_header() {
  return (
    <div>
      <Header />
    </div>
  );
}

export function Public_footer() {
  return <Foot_container />;
}
