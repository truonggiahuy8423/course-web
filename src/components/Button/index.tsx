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
  maxWidth?: string;
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
    maxWidth
  } = props;

  const customStyle = maxWidth ? { ...style, maxWidth } : style;

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
      style={customStyle}
      disabled={disabled}
      ref={ref}
    >
      {loading && <div className={styles.spinner}></div>}
      {children}
    </button>
  );
});

export default Button;
