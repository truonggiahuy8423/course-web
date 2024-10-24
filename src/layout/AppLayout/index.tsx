import classNames from "classnames";
import React, { forwardRef, ReactNode } from "react";
import styles from "./index.module.scss";
import { on } from "events";
import TopNav from "../../components/TopNav";

export type Type = "button" | "submit";
export type Color = "primary" | "secondary";

type Props = {
  children: ReactNode;
};

export const AppLayout = ((props: Props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.layout}>
        <TopNav></TopNav>
      {/* {loading && <div className={styles.spinner}></div>} Icon loading */}
      {children}
    </div>
  );
});

export default AppLayout;
