import React from "react";
// import './index.css';

interface MaxWidthContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  align?: "center" | "start" | "end";
}

const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({
  children,
  maxWidth = "400px",
  align = "center",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: String(align),
        width: "100%",
      }}
    >
      <div
        className="max-width-container"
        style={{
          maxWidth,
          width: "100%",
        }}
      >
        {" "}
        {children}
      </div>
    </div>
  );
};

export default MaxWidthContainer;
