import classnames from "classnames";
import React, { ReactNode } from "react";
import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.scss";
import { Folder } from "../../../../../interfaces/Resource";

type Type = "text" | "number" | "password" | "email" | "tel" | "hidden";

type Props = {
  children: ReactNode;
  folder: Folder;
  editable?: boolean; // modal
};

export const FolderComponent: React.FC<Props> = (props: Props) => {
  const { children, editable, folder } = props;

  return (
    <div
      className={folder.parentId ? styles.childrenFolder : styles.rootFolder}
    >
      <div className={styles.childrenFolderComponentContainer}>
        <div className={styles.childrenFolderName}>${folder.title}</div>
      </div>
      {children}
    </div>
  );
};

export default FolderComponent;
