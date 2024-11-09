import React, { ReactNode, CSSProperties } from 'react';
import styles from './index.module.scss';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

export const FormItem = (props: Props) => {
  const { children, style } = props;

  return <div className={styles.formItem} style={style}>{children}</div>;
};

export default FormItem;
