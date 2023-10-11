import React from 'react'

import CustomButton from './CustomButton'

type Props = {
  file: File|undefined
  setFile: (file: File) => void
  readFile: (name: 'logo' | 'full') => void
}

const FilePicker = ({file, setFile, readFile}:Props) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target.files) {
              setFile(e.target.files[0])
            }
          }}
        />
        <label htmlFor="file-upload" className='filepicker-label' >
          Upload File
        </label>
        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file ? file?.name : 'No file selected'}
        </p>
      </div>
      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs px-2 py-1.5"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyles='text-xs px-2 py-1.5'
        />
      </div>
    </div>
  )
}

export default FilePicker