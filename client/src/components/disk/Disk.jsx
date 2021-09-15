import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";
import cl from './disk.module.scss'
import {FileList} from "./fileList/FileList";
import {Popup} from "./Popup";
import {Uploader} from "./uploader/Uploader";


export const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const [dragEnter, setDragEnter] = useState(false)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandler = () => {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  const dragEnterHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  const dropHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
    setDragEnter(false)
  }

  return (!dragEnter ?
      <div className={cl.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
        <div className={cl.disk_btns}>
          <button className={cl.disk_back} onClick={backClickHandler}>Back</button>
          <button className={cl.disk_create} onClick={showPopupHandler}>Create folder</button>
          <div className={cl.disk_upload}>
            <label htmlFor="disk_uploadInput" className={cl.disk_uploadLabel}>Upload file</label>
            <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk_uploadInput"
                   className={cl.disk_uploadInput}/>
          </div>
        </div>
        <FileList/>
        <Popup/>
        <Uploader/>
      </div>
      :
      <div className={cl.dropArea} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
           onDragOver={dragEnterHandler}>
        Drag and drop the files here
      </div>
  );
};
