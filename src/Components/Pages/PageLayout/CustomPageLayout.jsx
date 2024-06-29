import React from "react";
import CustomUserSection from "../UserSection/CustomUserSection";
import CustomTrackList from "../TrackList/CustomTrackList";
import CustomTrackView from "../TrackView/CustomTrackView";
import { useSelector } from "react-redux";
import CustomMobilePage from "../MobilePage/CustomMobilePage";

const CustomPageLayout = () => {
  const currentColor = useSelector((state) => state.color);
  console.log("current", currentColor);

  const rgbColor = currentColor
    ? `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`
    : `rgba(30,215,96,0.5)`;

  return (
    <>
      <div
        className="main-pageLayout-container"
        style={{
          backgroundImage: `linear-gradient(108.18deg, ${rgbColor} 2.46%, #000000 99.84%)`,
        }}
      >
        <div className="customUserSection">
          <CustomUserSection />
        </div>
        <div className="tab-fix-view">
          <div className="customTrackList">
            <CustomTrackList />
          </div>

          <CustomMobilePage />
          <CustomTrackView />
        </div>
      </div>
    </>
  );
};

export default CustomPageLayout;
