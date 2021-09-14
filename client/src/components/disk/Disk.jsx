import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";
import {FileList} from "./fileList/FileList";
import cl from './disk.module.scss'
import {Popup} from "./Popup";


export const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)

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

  return (
    <div className={cl.disk}>
      <div className={cl.disk_btns}>
        <button className={cl.disk_back} onClick={backClickHandler}>Back</button>
        <button className={cl.disk_create} onClick={showPopupHandler}>Create folder</button>
      </div>
      <FileList/>
      <Popup/>
    </div>
  );
};
