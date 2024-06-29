import React from "react";
import BrandLogo from '../../Assets/SVG/spotify.svg'
import UserProfile from '../../Assets/PNG/Profile.png'

const CustomUserSection = () => {
  return (
    <>
      <div className="main-user-container">
        <div className="brand-logo">
            <img src={BrandLogo} alt="" />
        </div>
        <div className="user-profile">
            <img src={UserProfile} alt="" />
        </div>
      </div>
    </>
  );
};

export default CustomUserSection;
