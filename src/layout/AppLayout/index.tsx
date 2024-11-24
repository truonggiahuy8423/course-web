import classNames from "classnames";
import React, { forwardRef, ReactNode } from "react";
import styles from "./index.module.scss";
import { on } from "events";
import TopNav from "../../components/TopNav";
import { Outlet } from "react-router-dom";

export const AppLayout:any = () => {

  return (
    <div className={styles.layout}>
        <TopNav></TopNav>
      <Outlet/>
    </div>
  );
};

export default AppLayout;
