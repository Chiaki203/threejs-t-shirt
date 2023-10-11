import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'

type DecalTypeName = 'logo' | 'full'

const Customizer = () => {
  const snap = useSnapshot(state)
  const [file, setFile] = useState<File>()
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })
  console.log('activeFilterTab', activeFilterTab)
  const generateTabContent = () => {
    switch(activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker/>
      case 'filepicker': 
        return <FilePicker 
          file={file} 
          setFile={setFile} 
          readFile={readFile} 
          />
      case 'aipicker': 
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImage={generatingImg}
          handleSubmit={handleSubmit}
        />
      default: 
        return null
    }
  }

  const handleSubmit = async (type:any) => {
    if (!prompt) return alert('Please enter a prompt')
    try {
      setGeneratingImg(true)
      // const response = await fetch('http://localhost:8080/api/v1/dalle', {
      const response = await fetch('https://threejs-t-shirt-87fj.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      })
      const data = await response.json()
      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch(error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
      // setPrompt('')
    }
  }

  const handleDecals = (type:DecalTypeName, result:string) =>  {
    const decalType = DecalTypes[type]
    const decalTypeDefine = decalType.stateProperty as 'logoDecal' | 'fullDecal'
    state[decalTypeDefine] = result
    if (!activeFilterTab[decalType.filterTab as 'logoShirt' | 'stylishShirt']) {
      handleActiveFilterTab(decalType.filterTab as 'logoShirt' | 'stylishShirt')
    }
  }

  const handleActiveFilterTab = (tabName: 'logoShirt' | 'stylishShirt') => {
    switch(tabName) {
      case 'logoShirt': 
        state.isLogoTexture = !activeFilterTab.logoShirt
        // activeFilterTab.logoShirt = !activeFilterTab.logoShirt
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab.stylishShirt
        // activeFilterTab.stylishShirt = !activeFilterTab.stylishShirt
        break
      default: 
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }
    setActiveFilterTab(prevState => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }


  const readFile = (type:DecalTypeName) => {
    reader(file)
      .then(result => {
        handleDecals(type, result)
        setActiveEditorTab('')
      })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map(tab => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab={false}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>
          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map(tab => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as 'logoShirt' | 'stylishShirt']}
                handleClick={() => handleActiveFilterTab(tab.name as 'logoShirt' | 'stylishShirt')}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer