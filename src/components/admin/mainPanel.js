import React, { useState, useEffect } from "react";

import MainPanelNavbarColor from "./mainPanelNavbarColor";
import MainPanelMainVideoText from "./mainPanelMainVideoText";
import MainPanelAbout from "./mainPanelAbout";
import MainPanelContact from "./mainPanelContact";
import MainPanelFooter from "./mainPanelFooter";

function MainPanel() {
  return (
    <div className="max-h-[95.5vh] overflow-y-scroll">
      <MainPanelNavbarColor />
      <MainPanelMainVideoText />
      <MainPanelAbout />
      <MainPanelContact />
      <MainPanelFooter />
    </div>
  );
}

export default MainPanel;
