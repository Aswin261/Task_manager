import React from "react";
import Home from "./tasks/addtask";
import Modify from "./tasks/manage";
function Dashoboard() {
  return (
    <div class="d-flex">
      <div class="mr-5">
        <Home />
      </div>
      <Modify />
    </div>
  );
}

export default Dashoboard;
