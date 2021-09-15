import axios from 'axios'
import {hideLoader, showLoader} from "../reducers/appReducer";
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import {addUploadFile, changeUploadFile, showUploader} from "../reducers/uploadReducer";


export function getFiles(dirId, sort) {
  return async dispatch => {
    try {
      dispatch(showLoader())
      let url = `http://localhost:5000/api/files`
      if (dirId) {
        url = `http://localhost:5000/api/files?parent=${dirId}`
      }
      if (sort) {
        url = `http://localhost:5000/api/files?sort=${sort}`
      }
      if (dirId && sort) {
        url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
      }
      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(setFiles(response.data))
    } catch (e) {
      alert(e.response.data.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function createDir(dirId, name) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:5000/api/files`, {
        name,
        parent: dirId,
        type: 'dir'
      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(addFile(response.data))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export function uploadFile(file, dirId) {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (dirId) {
        formData.append('parent', dirId)
      }
      const uploadFile = {name: file.name, progress: 0, id: Date.now()}
      dispatch(showUploader())
      dispatch(addUploadFile(uploadFile))
      const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          if (totalLength) {
            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
            dispatch(changeUploadFile(uploadFile))
          }
        }
      });

      dispatch(addFile(response.data))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export async function downloadFile(file) {
  const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  // const response = await axios.get(`http://localhost:5000/api/files/download?id=${file._id}`, {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   },
  //   responseType: 'blob',
  // })

  if (response.status === 200) {
    debugger
    // подобный физическому файлу объект
    const blob = await response.blob()
    // const blob = response.data

    // из blob создаем url
    const downloadUrl = window.URL.createObjectURL(blob)
    // создаем невидимую ссылку
    const link = document.createElement('a')
    // в невидимую ссылку в которой href мы указывваем url из blob
    link.href = downloadUrl
    // в свойстве download у ссылки мы указываем имя файла
    link.download = file.name
    // добавляем эту ссылку в документ
    document.body.appendChild(link)
    // теперь ссылка является частью документа и имеет все необходимые свойства
    link.click()
    link.remove()
  }
}

export function deleteFile(file) {
  return async dispatch => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(deleteFileAction(file._id))
      alert(response.data.message)
    } catch (e) {
      alert(e?.response?.data?.message)
    }
  }
}

export function searchFiles(search) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(setFiles(response.data))
    } catch (e) {
      alert(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}
