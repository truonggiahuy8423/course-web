import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loadingState } from "../../states/loading";
import { set } from "react-hook-form";

const LoadingBar = () => {
  const isLoading = useRecoilValue(loadingState);
  const [width, setWidth] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setWidth(0);
      setIsDisplay(true);
      let progress = 0;
      interval = setInterval(() => {
        progress += 2;
        if (progress <= 66) {
          setWidth(progress);
        } else {
          clearInterval(interval);
        }
      }, 20);
    } else {
      setWidth(100);
      setTimeout(() => {
        setIsDisplay(false);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${width}%`,
        height: "2px",
        backgroundColor: "#1890ff",
        transition: "width 0.3s ease-in-out", // transition ngắn hơn cho cảm giác mượt
        zIndex: 5000,
        display: isDisplay ? "block" : "none",
      }}
    />
  );
};

export default LoadingBar;
