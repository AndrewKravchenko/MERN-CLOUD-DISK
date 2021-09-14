import React from 'react';
import cl from './file.module.scss'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'


export const File = ({file}) => {
  return (
    <div className={cl.file}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={cl.file_img}/>
      <div className={cl.file_name}>{file.name}</div>
      <div className={cl.file_date}>{file.date.slice(0, 10)}</div>
      <div className={cl.file_size}>{file.size}</div>
    </div>
  );
};
