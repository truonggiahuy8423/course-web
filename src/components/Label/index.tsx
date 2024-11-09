import React from 'react';
import styles from './index.module.scss';
interface LabelProps {
    text: string;
    fontSize: 'small' | 'medium' | 'large';
    bold?: boolean;
    style?: React.CSSProperties;
}

export const Label: React.FC<LabelProps> = ({ text, fontSize, bold, style }) => {
    const getFontSize = () => {
        switch (fontSize) {
            case 'small':
                return '13px';
            case 'medium':
                return '24px';
            case 'large':
                return '30px';
            default:
                return '13px';
        }
    };

    return (
        <span 
            style={{ fontSize: getFontSize(), ...style }} 
            className={bold ? styles.bold : ''}
        >
            {text}
        </span>
    );
};

export default Label;