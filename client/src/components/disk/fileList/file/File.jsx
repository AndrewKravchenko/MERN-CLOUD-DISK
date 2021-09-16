import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import sizeFormat from "../../../../utils/sizeFormat";
import cl from './file.module.scss'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {deleteFile, downloadFile} from "../../../../actions/file";


export const File = ({file}) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const fileView = useSelector(state => state.files.view)

  const openDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  function downloadClickHandler(e) {
    e.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler(e) {
    e.stopPropagation()
    dispatch(deleteFile(file))
  }

  if (fileView === 'list') {
    return (
      <div className={cl.file} onClick={() => openDirHandler(file)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={cl.file_img}/>
        <div className={cl.file_name}>{file.name}</div>
        <div className={cl.file_date}>{file.date.slice(0, 10)}</div>
        <div className={cl.file_size}>{sizeFormat(file.size)}</div>
        {file.type !== 'dir' &&
        <button onClick={(e) => downloadClickHandler(e)}
                className={`${cl.file_btn} ${cl.file_download}`}>download</button>}
        <button onClick={(e) => deleteClickHandler(e)} className={`${cl.file_btn} ${cl.file_delete}`}>delete</button>
      </div>
    )
  }

  if (fileView === 'plate') {
    return (
      <div className={cl.filePlate} onClick={() => openDirHandler(file)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={cl.filePlate_img}/>
        <div className={cl.filePlate_name}>{file.name}</div>
        <div className={cl.filePlate_btns}>
          {file.type !== 'dir' &&
          <button onClick={(e) => downloadClickHandler(e)}>download</button>}
          <button onClick={(e) => deleteClickHandler(e)}>delete</button>
        </div>
      </div>
    )
  }
}