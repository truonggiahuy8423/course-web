import classNames from "classnames";
import React, { forwardRef, ReactNode } from "react";
import styles from "./index.module.scss";
import { on } from "events";

export type Type = "button" | "submit";
export type Color = "primary" | "secondary";

type Props = {
  children: ReactNode;
  type: Type;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  color?: Color;
  mini?: boolean;
  bold?: boolean;
  rounded?: boolean;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    children,
    type,
    onClick,
    fullWidth,
    disabled,
    color,
    mini,
    bold,
    rounded,
    className,
    style,
    loading,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(className, styles.button, styles[String(color)], {
        [styles.fullWidth]: fullWidth,
        [styles.mini]: mini,
        [styles.bold]: bold,
        [styles.rounded]: rounded,
        [styles.loading]: loading,
      })}
      style={style}
      disabled={disabled}
      ref={ref} // Thêm ref vào nút

    >
      {loading && <div className={styles.spinner}></div>} {/* Icon loading */}
      {children}
    </button>
  );
});

export default Button;
