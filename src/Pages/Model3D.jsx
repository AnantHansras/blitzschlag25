
import React from "react";
import { Canvas ,useThree} from "@react-three/fiber";
import { Suspense } from "react";
import { useProgress,Html, ScrollControls } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Model from "../../public/Model";
import { Environment } from "@react-three/drei";
function Loader(){
    const { progress,active } = useProgress();
    return <Html center>{progress.toFixed(1)} % loaded</Html>;
}
export default function Model3D(){
  return (
    <Canvas camera={{ position: [13, 3,0], fov: 55 }} gl={{antialias:true}} dpr={[1,1.5]}  style={{ height: "100vh", background: "#000" }} >
        <directionalLight position={[13,3,0]} intensity={4}/>
        <ambientLight intensity={0.5} />

        <Suspense fallback={<Loader/>}>
            <ScrollControls damping={0.2} pages={3}>
                <Model />
            </ScrollControls>
        <Environment files={"/background_scene.hdr"} background/>
        </Suspense>
        <OrbitControls
        enableZoom={false}
      />
    </Canvas>
  );
};
