import React, { useState } from "react";
import "./TabsNavigation.css";

const TabsNavigation = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container">
      <button
        className={activeTab === "personal" ? "tab active" : "tab"}
        onClick={() => handleTabClick("personal")}
      >
        <i className="fas fa-user"></i> Personal Information
      </button>
      <button
        className={activeTab === "professional" ? "tab active" : "tab"}
        onClick={() => handleTabClick("professional")}
      >
        <i className="fas fa-briefcase"></i> Professional Information
      </button>
      <button
        className={activeTab === "documents" ? "tab active" : "tab"}
        onClick={() => handleTabClick("documents")}
      >
        <i className="fas fa-file"></i> Documents
      </button>
      <button
        className={activeTab === "access" ? "tab active" : "tab"}
        onClick={() => handleTabClick("access")}
      >
        <i className="fas fa-lock"></i> Account Access
      </button>
    </div>
  );
};

export default TabsNavigation;
