import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {FileList} from "./fileList/FileList";
import cl from './disk.module.scss'
import {Popup} from "./Popup";


export const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

  return (
    <div className={cl.disk}>
      <div className={cl.disk_btns}>
        <button className={cl.disk_back}>Back</button>
        <button className={cl.disk_create} onClick={() => showPopupHandler()}>Create folder</button>
      </div>
      <FileList/>
      <Popup/>
    </div>
  );
};
