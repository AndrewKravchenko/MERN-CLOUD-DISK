import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import {FileList} from "./fileList/FileList";
import cl from './disk.module.scss'


export const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  return (
    <div className={cl.disk}>
      <div className={cl.disk_btns}>
        <button className={cl.disk_back}>Back</button>
        <button className={cl.disk_create}>Create folder</button>
      </div>
      <FileList/>
    </div>
  );
};
