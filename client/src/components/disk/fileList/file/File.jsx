import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import cl from './file.module.scss'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'


export const File = ({file}) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  const openDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  return (
    <div className={cl.file} onClick={() => openDirHandler(file)}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={cl.file_img}/>
      <div className={cl.file_name}>{file.name}</div>
      <div className={cl.file_date}>{file.date.slice(0, 10)}</div>
      <div className={cl.file_size}>{file.size}</div>
    </div>
  );
};
