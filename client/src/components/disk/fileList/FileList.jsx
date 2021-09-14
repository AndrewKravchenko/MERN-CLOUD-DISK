import React from 'react';
import cl from './fileList.module.scss'
import {useSelector} from "react-redux";
import {File} from "./file/File";


export const FileList = () => {
  const files = useSelector(state => state.files.files)
    .map(file => <File key={file.id} file={file}/>)

  return (
    <div className={cl.fileList}>
      <div className={cl.fileList_header}>
        <div className={cl.fileList_name}>Name</div>
        <div className={cl.fileList_date}>Date</div>
        <div className={cl.fileList_size}>Size</div>
      </div>
      {files}
    </div>
  );
};
