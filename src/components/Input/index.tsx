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
  maxWidth?: string;
  style?: React.CSSProperties;
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
    maxWidth,
    style,
    errorMessage,
    disabled,
  } = props;

  const customStyle = maxWidth ? { ...style, maxWidth } : style;


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
        style={customStyle}
      />
      {errorMessage && (
        <small className={styles.errorMessage}>{errorMessage}</small>
      )}
    </div>
  );
};

export default Input;
