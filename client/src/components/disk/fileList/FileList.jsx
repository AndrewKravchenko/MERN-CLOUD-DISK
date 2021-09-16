import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import cl from './fileList.module.scss'
import {useSelector} from "react-redux";
import {File} from "./file/File";
import './fileListAnimation.scss'

export const FileList = () => {
  const files = useSelector(state => state.files.files)
  const fileView = useSelector(state => state.files.view)

  if (files.length === 0) {
    return <div className='loader'>Files not found</div>
  }
  if (fileView === "plate") {
    return (
      <div className={cl.filePlate}>
        {files.map(file =>
          <File key={file._id} file={file}/>
        )}
      </div>
    )
  }

  if (fileView === 'list') {
    return (
      <div className={cl.fileList}>
        <div className={cl.fileList_header}>
          <div className={cl.fileList_name}>Name</div>
          <div className={cl.fileList_date}>Date</div>
          <div className={cl.fileList_size}>Size</div>
        </div>
        <TransitionGroup>
          {files.map(file =>
            <CSSTransition
              key={file._id}
              timeout={500} // время за которое будут меняться классы (анимация)
              classNames={'file'}
              exit={false}// анимировать будет только появление папок
            >
              <File file={file}/>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}
