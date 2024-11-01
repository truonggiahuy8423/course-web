import classnames from 'classnames';
import React from 'react';
import { forwardRef } from "react";
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './index.module.scss';

type Type = 'text' | 'number' | 'password' | 'email' | 'tel' | 'hidden';

type Props = {
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
};

export const SearchInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const {
    placeholder,
    maxLength,
    disabled,
  } = props;

  return (
      <input
        type="text"
        className={classnames(styles.input)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        ref={ref}
      />
  );
});

export default SearchInput;
