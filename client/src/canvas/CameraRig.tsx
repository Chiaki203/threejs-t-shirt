import React, { ReactNode, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { Group, Object3DEventMap, Vector3 } from 'three'
// import { Vector3 } from 'three'


import state from '../store'

const CameraRig = ({children}:{children:ReactNode}) => {
  const group = useRef<any>()
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600
    let targetPosition = new Vector3(-0.4, 0, 2)
    if (snap.intro) {
      if (isBreakpoint) targetPosition.set(0, 0, 2)
      if (isMobile) targetPosition.set(0, 0.2, 2.5)
    } else {
      if (isMobile) targetPosition.set(0, 0, 2.5)
      else targetPosition.set(0, 0, 2)
    }

    easing.damp3(
      state.camera.position,
      targetPosition,
      0.25,
      delta
    )

    easing.dampE(
      group.current?.rotation,
      [state.pointer.y / 10, state.pointer.x / 5, 0],
      0.25, 
      delta
    )
  })
  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig