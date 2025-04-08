import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import "./Windmill.css"
import { GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import WindModel from "./WindModel"
import Speed from "../Speed"
import WorkingModel from "../workingModel/WorkingModel"
const Box3d = () =>{
    const boxRef = useRef();

    const { color, speed } = useControls({
        color:"#00bfff",
        speed: {
            value: 0.005,
            min: 0.0,
            max: 0.03,
            step: 0.001
        }
    });

    useFrame(()=>{
        boxRef.current.rotation.x += speed;
    })
    return(
        <mesh ref={boxRef}>
            <axesHelper args={[10]} />
            <boxGeometry args={[2,2,2]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}


// const WindMill = ({ position }) => {
//     const { scene, nodes } = useGLTF("/windTurbine.glb");
//     const rotorRef = useRef();
  
//     useFrame(() => {
//       if (rotorRef.current) {
//         rotorRef.current.rotation.z += 0.01; // Adjust the speed as needed
//       }
//     });
  
//     return (
//       <primitive
//         object={scene.clone()}
//         position={position}
//         // position={[0, 1, 0]}
//         scale={[0.1, 0.1, 0.1]}
//       >
//         <primitive
//           object={nodes.Rotor.clone()}
          
//           position={[0, 10, 3.4]}
//           scale={[0.8, 0.8, 0.8]}
//           ref={rotorRef}
//         >
//         <axesHelper args={[10]} />
//         </primitive>
//       </primitive>
//     );
//   };

const WindMill = ({ position }) => {
    const { scene, nodes } = useGLTF("/WindTest2.glb");
    const rotorRef = useRef();
    const bladeRef = useRef();
    useFrame(() => {
      if (rotorRef.current) {
        rotorRef.current.rotation.z += 0.01; // Adjust the speed as needed
      }

      if (bladeRef.current) {
        bladeRef.current.rotation.y += 0.01; // Adjust the speed as needed
      }
    });
  
    return (
        <>
        <group position={position}>
        {/* <primitive
          object={scene}
          scale={[0.1, 0.1, 0.1]}
        /> */}
            {/* <primitive object={nodes.Turbine.clone()} scale={[0.1, 0.1, 0.1]}  position={position}> */}
                <primitive object={nodes.Rotor.clone()} position={[0, 0, 1.3]} scale={[1, 1, 1]} > */}
                    <axesHelper args={[10]} />
                    <group>
                        <primitive ref={bladeRef} object={nodes.Blade_1.clone()} />
                        <primitive object={nodes.Blade_2.clone()} />
                        <primitive object={nodes.Blade_3.clone()} />
                    </group>
                </primitive>
            {/* </primitive> */}
        {/* </primitive> */}
    </group>
    </>
    );
  };

  const WindMillFarm =() =>{
    const positions = [];

    for (let i = -6; i <= 6; i += 2) {
        for (let j = -6; j <= 6; j += 2) {
        positions.push([i*3, 0, j*3]);
        }
    }

    return (
        <>
        {positions.map((pos, index) => (
            <WindModel key={index} position={pos} scale={[0.1, 0.1, 0.1]} />
            // <WorkingModel position={pos} />
        ))}
        </>
    );
  }

const Model = () => {
  return (
    <div className='canvas-container'>
        <Canvas>
            <GizmoHelper>
                <GizmoViewport />
            </GizmoHelper>
            {/* <axesHelper args={[10]} /> */}
            <gridHelper args={[40,40]}/>
            <OrbitControls />
            <Speed />
            {/* <Box3d /> */}
            {/* <WindModel /> */}
            {/* <WindMill position={[0,0,0]} />  */}
            {/* <WindMill position={[5,1,5]} /> */}
            <WindMillFarm />
            {/* <WorkingModel /> */}
            <ambientLight />    
            <directionalLight position={[2,5,2]} />
        </Canvas>
    </div>
  )
}

export default Model;