import React from "react";

import { About_container } from "./component/about_component";
import { About_foot } from "./component/about_component";
import { File_input } from "./component/file_input_component";

export function About() {
  return (
    <div>
      <About_container />
      <File_input />
    </div>
  );
}
