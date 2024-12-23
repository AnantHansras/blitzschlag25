'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'; // Import THREE for type reference
import { AmbientLight } from 'three'

function Model() {
  const fbxRef = useRef(null); // Removed type annotation
  const [isLoaded, setIsLoaded] = useState(false); // No change needed

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load('/MAIIN4.fbx', (fbx) => {
      fbxRef.current = fbx; // Assign the loaded FBX model
      fbx.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed
      setIsLoaded(true); // Update loading state
    });
  }, []);

  useFrame(() => {
    if (fbxRef.current) {
      // Optional: Add any animations or transformations here
    }
  });

  return isLoaded ? <primitive object={fbxRef.current} /> : null; // Render the model if loaded
}

export default function Model3D() {
  return (
    <div className="w-full h-screen bg-blue-400">
        
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <PresentationControls
            global
            zoom={0.4}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <Model />
          </PresentationControls>
          <Environment preset="city" />
          <ambientLight />
          {/* <directionalLight /> */}
        </Suspense>
        <OrbitControls enableZoom={false} />
        <EffectComposer>
          <Bloom />
        </EffectComposer>
      </Canvas>
    </div>
  )
}