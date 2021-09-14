import React, {useState} from 'react';
import {Input} from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";
import cl from './disk.module.scss'


export const Popup = () => {
  const [dirName, setDirName] = useState('')
  const dispatch = useDispatch()

  const popupDisplay = useSelector(state => state.files.popupDisplay)
  const currentDir = useSelector(state => state.files.currentDir)

  const createHandler = () => {
    dispatch(createDir(currentDir, dirName))
    dispatch(setPopupDisplay('none'))
    setDirName('')
  }

  const closeHandler = () => {
    dispatch(setPopupDisplay('none'))
  };

  return (
    <div className={cl.popup} onClick={closeHandler} style={{display: popupDisplay}}>
      <div className={cl.popup_content} onClick={(event => event.stopPropagation())}>
        <div className={cl.popup_header}>
          <div className={cl.popup_title}>Create a new folder</div>
          <button className={cl.popup_close} onClick={closeHandler}>X</button>
        </div>
        <Input type="text" placeholder="Enter the folder name" value={dirName} setValue={setDirName}/>
        <button className={cl.popup_create} onClick={createHandler}>Create</button>
      </div>
    </div>
  );
};
