import React from 'react';
import {UploadFile} from "./UploadFile";
import cl from './uploader.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";


export const Uploader = () => {
  const files = useSelector(state => state.upload.files)
  const isVisible = useSelector(state => state.upload.isVisible)
  const dispatch = useDispatch()

  return (isVisible &&
    <div className={cl.uploader}>
      <div className={cl.uploader_header}>
        <div className={cl.uploader_title}>Загрузки</div>
        <button className={cl.uploader_close} onClick={() => dispatch(hideUploader())}>X</button>
      </div>
      {files.map((file, fileKey) =>
        <React.Fragment key={fileKey}>
          <UploadFile key={file.id} file={file}/>
        </React.Fragment>
      )}
    </div>
  );
};
