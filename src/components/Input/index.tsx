import classnames from 'classnames';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './index.module.scss';

type Type = 'text' | 'number' | 'password' | 'email' | 'tel' | 'hidden';

type Props = {
  type: Type;
  id?: string;
  name?: string;
  autoComplete?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  maxLength?: number;
  errorMessage?: string;
  disabled?: boolean;
};

export const Input = (props: Props) => {
  const {
    type,
    id,
    name,
    autoComplete,
    register,
    placeholder,
    maxLength,
    errorMessage,
    disabled,
  } = props;

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        {...register}
        className={classnames(styles.input, { [styles.error]: errorMessage })}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
      />
      {errorMessage && (
        <small className={styles.errorMessage}>{errorMessage}</small>
      )}
    </div>
  );
};

export default Input;
