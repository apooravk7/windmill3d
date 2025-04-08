import { Instance, Instances, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, DoubleSide, MathUtils } from "three";

const INSTANCES = 480;
const MAX_OPACITY = 0.1;

const SpeedShape = () => {
  const ref = useRef();
  let randomPosition = {
    x: 0,
    y: 0,
    z: 0,
  };
  let randomSpeed = 10;

  const resetRandom = () => {
    randomPosition = {
      x: MathUtils.randFloatSpread(40),
      y: Math.random() * 4,
      z: MathUtils.randFloatSpread(45),
    };
    // randomSpeed = MathUtils.randFloat(16, 20);
  };
  resetRandom();

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.position.z -= randomSpeed * delta;
      if (ref.current.position.z < -20) {
        resetRandom();
        ref.current.position.z = randomPosition.z;
      }
    }
  });

  return (
    <Instance
      ref={ref}
      color="white"
      position={[randomPosition.x, randomPosition.y, randomPosition.z]}
      rotation-y={Math.PI / 2}
    />
  );
};

 const Speed = () => {

  return (
    <group>
      <Instances>
        <planeGeometry args={[1, 0.004]} />
        <meshBasicMaterial
          side={DoubleSide}
          blending={AdditiveBlending}
          opacity={1}
          transparent
        />
        {Array(INSTANCES)
          .fill()
          .map((_, key) => (
            <SpeedShape key={key} />
          ))}
      </Instances>
    </group>
  );
};

export default Speed;