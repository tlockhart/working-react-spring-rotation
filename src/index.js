import ReactDOM from 'react-dom'
import React, { useState, useCallback } from 'react'
import { Canvas } from 'react-three-fiber'
// import { useSpring } from '@react-spring/core'
import { a, useSpring, config } from '@react-spring/three'

import './styles.css'

function Box(props) {
  // NOTE: Active is only necessary to change color
  const [active, setActive] = useState(0)

  // NOTE: Active is only necessary to change color
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  const [{ rotation }, setRotation] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
  }))
  // interpolate colors from commong spring
  const color = spring.to([0, 1], ['#6246ea', '#e45858'])

  const onClick = useCallback(
    (e) => {
      console.log('Rotation:', rotation.animation.to)
      const [x, y, z] = rotation.animation.to

      // Option1: CounterClockwise
      setRotation({
        rotation: [x, y + 1.55, z],
        config: config.default
      })
      // Option2: Clockwise
      // setRotation({
      //   rotation: [x, y - 1.55, z],
      //   config: config.default
      // })

      //NOTE: SETACTIVE ONLY NECESSARY TO CHANGE COLOR
      setActive(Number(!active))
    },
    [rotation, setRotation]
  )

  return (
    <a.group>
      <a.mesh rotation={rotation} onClick={onClick}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
      </a.mesh>
    </a.group>
  )
}

ReactDOM.render(
  <Canvas colorManagement camera={{ position: [-10, 10, 10], fov: 35 }}>
    <ambientLight />
    <pointLight position={[-10, 10, -10]} castShadow />
    <Box />
  </Canvas>,
  document.getElementById('root')
)
