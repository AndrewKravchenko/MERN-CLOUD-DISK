import React from 'react';
import cl from './uploader.module.scss';
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";


export const UploadFile = ({file}) => {
  const dispatch = useDispatch()

  return (
    <div className={cl.uploadFile}>
      <div className={cl.uploadFile_header}>
        <div className={cl.uploadFile_name}>{file.name}</div>
        <button className={cl.uploadFile_remove} onClick={() => dispatch(removeUploadFile(file.id))}>X</button>
      </div>
      <div className={cl.uploadFile_progressBar}>
        <div className={cl.uploadFile_uploadBar} style={{width: file.progress + "%"}}/>
        <div className={cl.uploadFile_percent}>{file.progress}%</div>
      </div>
    </div>
  );
};
