import React from 'react'
import Customizer from '../pages/Customizer'
import { CustomButton } from '.'

type Props = {
  prompt: string
  setPrompt: (prompt: string) => void
  generatingImage: boolean
  handleSubmit: (type: string) => Promise<void>
}

const AIPicker = ({
  prompt,
  setPrompt,
  generatingImage,
  handleSubmit
}: Props) => {
  return (
    <div className='aipicker-container'>
      <textarea
        className='aipicker-textarea'
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImage ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles='text-xs px-2 py-1.5'
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles='text-xs px-2 py-1.5'
            />
            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles='text-xs px-2 py-1.5'
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker


// Design a simple, modern logo icon using geometric shapes and a minimalistic color scheme, without any text or lettering.

// create a gradient pattern that goes from blue to red

// create a smooth gradient pattern texture in shades of orange, blue and green that can be used for a t-shirt design

// create a unique t-shirt texture that has a vintage and distressed look. The texture should be designed to cover the entire t-shirt.