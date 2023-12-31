import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'

type Props = {
  type: string
  title: string
  customStyles: string
  handleClick?: () => void
}

const CustomButton = ({type, title, customStyles, handleClick}:Props) => {
  const snap = useSnapshot(state)
  const generateStyle = (type:string) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      }
    }
  }
  return (
    <button
      className={`flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton