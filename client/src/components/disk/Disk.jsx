import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import {setCurrentDir, setFileView, setPopupDisplay} from "../../reducers/fileReducer";
import cl from './disk.module.scss'
import {FileList} from "./fileList/FileList";
import {Popup} from "./Popup";
import {Uploader} from "./uploader/Uploader";
import './loader.scss'

export const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const loader = useSelector(state => state.app.loader)
  const [dragEnter, setDragEnter] = useState(false)
  const [sort, setSort] = useState('type')

  useEffect(() => {
    dispatch(getFiles(currentDir, sort))
  }, [currentDir, sort])

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

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"/>
      </div>
    )
  }

  return (!dragEnter ?
      <div className={cl.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
           onDragOver={dragEnterHandler}>
        <div className={cl.disk_btns}>
          <button className={cl.disk_back} onClick={backClickHandler}>Back</button>
          <button className={cl.disk_create} onClick={showPopupHandler}>Create folder</button>
          <div className={cl.disk_upload}>
            <label htmlFor="disk_uploadInput" className={cl.disk_uploadLabel}>Upload file</label>
            <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk_uploadInput"
                   className={cl.disk_uploadInput}/>
          </div>
          <select value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={cl.disk_select}>
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="date">Date</option>
          </select>
          <button className={cl.disk_plate} onClick={() => dispatch(setFileView('plate'))}/>
          <button className={cl.disk_list} onClick={() => dispatch(setFileView('list'))}/>
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
