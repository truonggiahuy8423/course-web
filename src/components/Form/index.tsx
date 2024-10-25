import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './index.module.scss';

export type gapType = 'small' | 'medium';

type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  gap?: gapType;
};

export const Form = (props: Props) => {
  const { onSubmit, gap, children } = props;
  const formClass = classNames(styles.form, styles[String(gap)]);

  return (
    <form onSubmit={onSubmit} className={formClass}>
      {children}
    </form>
  );
};

Form.defaultProps = {
  gap: 'medium',
};

export default Form;
