import React from "react";
import styles from "./index.module.scss";

interface ImageProps {
  srcImg: string;
  rounded?: boolean;
  width?: string;
  height?: string;
  altImg?: string;
}

export const Image: React.FC<ImageProps> = ({ srcImg, rounded, width, height, altImg = "/img/blank_image.png" }) => {
    const avatarSrc =
        srcImg !== "null" && srcImg !== null
            ? `data:image/jpeg;base64,${srcImg}`
            : altImg;
    return (
        <img
            src={avatarSrc}
            alt="Image"
            width={width}
            height={height}
            className={rounded ? styles.rounded : ""}
        />
    );
};

export default Image;
