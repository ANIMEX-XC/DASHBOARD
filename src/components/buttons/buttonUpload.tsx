/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import axios from 'axios'
import { CONFIGS } from '../../configs'

interface ButtonUploadFileTypes {
  onUpload: (url: string) => void
}

export default function ButtonUploadFile({ onUpload }: ButtonUploadFileTypes) {
  const fileInputRef: any = useRef(null)

  const handleFileUpload = async () => {
    const selectedFile = fileInputRef.current.files[0]
    const MAX_FILE_SIZE = 2048 // 2MB

    if (!selectedFile) {
      console.log({
        message: 'silahkan pilih file terlebih dahulu',
        isError: true
      })
      return
    }

    const fileSizeKiloBytes = selectedFile.size / 1024

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      console.log({
        message: 'maksimum file 2mb',
        isError: true
      })
      return
    }

    const formData = new FormData()

    formData.append('file', fileInputRef.current.files[0])

    try {
      const result = await axios.post(CONFIGS.uploadFileUrl, formData)
      console.log(result.data.fileUrl)
      onUpload(result.data.fileUrl)
    } catch (error: any) {
      console.log(error)
      console.log({
        message: 'tidak dapat mengunggah file ' + error.response.data.error_message,
        isError: true
      })
    }
  }

  return (
    <div className='flex items-center'>
      <div onClick={() => fileInputRef.current.click()}>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept='image/*'
        ></input>
      </div>
    </div>
  )
}
