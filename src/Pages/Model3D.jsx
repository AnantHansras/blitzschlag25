import { Environment,OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Model } from "../../public/Model";

const Model3D=()=>{
    return(
        <div className="h-[100vh] w-[100vw]">
            <Canvas>
                <Environment preset="studio"/>
                <OrbitControls/>
                <Model/>
            </Canvas>
        </div>
    );
};
export default Model3D;