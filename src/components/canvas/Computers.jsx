import React, {Suspense, useEffect, useState} from 'react'
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Preload, useGLTF} from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({isMobile, isTablet}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} castShadow shadow-mapSize={1024} intensity={1} />
      <primitive 
      object={computer.scene}
      scale={isMobile ? 0.6 : isTablet ? 0.72 : 0.75}
      position={isMobile ? [0, -3.5, -1.9] : isTablet ? [0, -3, -2.3] : [0, -3.25, -1.5]}
      rotation={[0, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
const [isTablet, setIsTablet] = useState(false)

  useEffect(()=>{
    const mediaPhone = window.matchMedia("(max-width: 500px)");
    const mediaTablet = window.matchMedia("(max-width: 900px)");

    setIsMobile(mediaPhone.matches);
    setIsTablet(mediaTablet.matches);

    const handleMediaPhoneChange = (e) => {
      setIsMobile(e.matches);
    }
    const handleMediaTabletChange = (e) => {
      setIsTablet(e.matches);
    }

    mediaPhone.addEventListener('change', handleMediaPhoneChange);
    mediaTablet.addEventListener('change', handleMediaTabletChange);

    return () => {
      mediaPhone.removeEventListener('change', handleMediaPhoneChange)
      mediaTablet.removeEventListener('change', handleMediaTabletChange)
    }
  }, [])

  return (
    <Canvas
    frameloop='demand'
    shadows
    camera={{ position: [20,3,5], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} isTablet={isTablet} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas