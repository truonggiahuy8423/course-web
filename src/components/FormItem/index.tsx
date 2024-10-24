import React, { ReactNode } from 'react';
import styles from './index.module.scss';

type Props = {
  children: ReactNode;
};

export const FormItem = (props: Props) => {
  const { children } = props;

  return <div className={styles.formItem}>{children}</div>;
};

export default FormItem;
