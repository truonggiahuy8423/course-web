import React, {ReactNode} from 'react';
interface ComponentContainerProps {
    children: ReactNode;
    padding?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
    justifyContent?: 'right' | 'left';
}
const ComponentContainer: React.FC<ComponentContainerProps> = ({ padding, justifyContent, children }) => {
    const justifyContentValue = justifyContent === 'right' ? 'flex-end' : 'flex-start';
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: justifyContentValue,
        paddingTop: padding?.top || '0',
        paddingRight: padding?.right || '0',
        paddingBottom: padding?.bottom || '0',
        paddingLeft: padding?.left || '0',
    };
    return <div style={containerStyle}>{children}</div>;
};
export default ComponentContainer;