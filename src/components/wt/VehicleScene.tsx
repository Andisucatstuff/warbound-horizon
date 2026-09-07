import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type VehicleKind = "jet" | "tank";

export type Livery = {
  name: string;
  base: string;
  camo: string;
  accent: string;
};

function Jet({ livery }: { livery: Livery }) {
  const group = useRef<THREE.Group>(null);
  const prop = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    }
    if (prop.current) prop.current.rotation.z += dt * 28;
  });

  const metal = { metalness: 0.75, roughness: 0.32 };

  return (
    <group ref={group} rotation={[0, Math.PI * 0.12, 0]}>
      {/* fuselage */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.42, 3.1, 8, 24]} />
        <meshStandardMaterial color={livery.base} {...metal} />
      </mesh>
      {/* nose cone */}
      <mesh castShadow position={[0, 0, 2.05]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.42, 0.9, 24]} />
        <meshStandardMaterial color={livery.accent} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* prop */}
      <group ref={prop} position={[0, 0, 2.5]}>
        {[0, Math.PI / 1.5, -Math.PI / 1.5].map((r) => (
          <mesh key={r} rotation={[0, 0, r]}>
            <boxGeometry args={[0.12, 1.7, 0.03]} />
            <meshStandardMaterial color="#1b1f26" metalness={0.6} roughness={0.5} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.4, 16]} />
          <meshStandardMaterial color={livery.accent} metalness={0.9} roughness={0.25} />
        </mesh>
      </group>
      {/* canopy */}
      <mesh position={[0, 0.36, 0.35]} scale={[0.62, 0.5, 1.5]}>
        <sphereGeometry args={[0.5, 24, 18]} />
        <meshPhysicalMaterial
          color="#9fd8ff"
          transparent
          opacity={0.55}
          roughness={0.08}
          metalness={0.1}
        />
      </mesh>
      {/* wings */}
      <mesh castShadow position={[0, -0.08, 0.25]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6.4, 0.12, 1.15]} />
        <meshStandardMaterial color={livery.base} {...metal} />
      </mesh>
      {/* camo stripes on wings */}
      <mesh position={[2.0, -0.005, 0.25]}>
        <boxGeometry args={[1.3, 0.13, 1.16]} />
        <meshStandardMaterial color={livery.camo} metalness={0.5} roughness={0.55} />
      </mesh>
      <mesh position={[-2.0, -0.005, 0.25]}>
        <boxGeometry args={[1.3, 0.13, 1.16]} />
        <meshStandardMaterial color={livery.camo} metalness={0.5} roughness={0.55} />
      </mesh>
      {/* wing tips */}
      {[-3.2, 3.2].map((x) => (
        <mesh key={x} position={[x, -0.08, 0.25]}>
          <boxGeometry args={[0.16, 0.16, 1.15]} />
          <meshStandardMaterial color={livery.accent} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* roundels */}
      {[-1.5, 1.5].map((x) => (
        <mesh key={x} position={[x, 0.02, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.3, 24]} />
          <meshStandardMaterial color={livery.accent} roughness={0.4} />
        </mesh>
      ))}
      {/* tail planes */}
      <mesh castShadow position={[0, 0, -1.6]}>
        <boxGeometry args={[2.2, 0.1, 0.6]} />
        <meshStandardMaterial color={livery.base} {...metal} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -1.7]}>
        <boxGeometry args={[0.1, 1.0, 0.75]} />
        <meshStandardMaterial color={livery.camo} {...metal} />
      </mesh>
      {/* exhaust glow */}
      <mesh position={[0, 0, -1.95]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.3, 20]} />
        <meshStandardMaterial
          color={livery.accent}
          emissive={livery.accent}
          emissiveIntensity={1.6}
        />
      </mesh>
    </group>
  );
}

function Tank({ livery }: { livery: Livery }) {
  const turret = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (turret.current) {
      turret.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.5;
    }
  });

  const hull = { color: livery.base, metalness: 0.55, roughness: 0.55 };

  return (
    <group position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.18, 0]}>
      {/* tracks */}
      {[-1.05, 1.05].map((x) => (
        <group key={x} position={[x, 0.42, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.8, 3.7]} />
            <meshStandardMaterial color="#20242b" metalness={0.5} roughness={0.75} />
          </mesh>
          {[-1.35, -0.68, 0, 0.68, 1.35].map((z) => (
            <mesh key={z} position={[0, -0.12, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.6, 18]} />
              <meshStandardMaterial color="#2c323b" metalness={0.6} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      {/* lower hull */}
      <mesh castShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[2.0, 0.65, 3.5]} />
        <meshStandardMaterial {...hull} />
      </mesh>
      {/* upper hull with sloped front */}
      <mesh castShadow position={[0, 1.12, -0.1]}>
        <boxGeometry args={[2.35, 0.34, 3.2]} />
        <meshStandardMaterial {...hull} />
      </mesh>
      <mesh castShadow position={[0, 1.05, 1.62]} rotation={[-0.55, 0, 0]}>
        <boxGeometry args={[2.35, 0.28, 1.1]} />
        <meshStandardMaterial color={livery.camo} metalness={0.5} roughness={0.6} />
      </mesh>
      {/* camo blotches */}
      <mesh position={[0.6, 1.3, -0.9]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.9, 0.05, 1.0]} />
        <meshStandardMaterial color={livery.camo} roughness={0.7} />
      </mesh>
      <mesh position={[-0.7, 1.3, 0.4]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.7, 0.05, 1.2]} />
        <meshStandardMaterial color={livery.camo} roughness={0.7} />
      </mesh>
      {/* turret */}
      <group ref={turret} position={[0, 1.3, -0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.95, 1.12, 0.6, 8]} />
          <meshStandardMaterial {...hull} />
        </mesh>
        <mesh castShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.55, 0.85, 0.18, 8]} />
          <meshStandardMaterial color={livery.camo} metalness={0.5} roughness={0.6} />
        </mesh>
        {/* hatch */}
        <mesh position={[0.3, 0.47, -0.2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.12, 16]} />
          <meshStandardMaterial color="#2a2f36" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* barrel */}
        <mesh castShadow position={[0, 0.05, 1.55]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.17, 3.0, 18]} />
          <meshStandardMaterial color="#3a4048" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.05, 2.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.21, 0.21, 0.38, 18]} />
          <meshStandardMaterial
            color="#31373f"
            emissive={livery.accent}
            emissiveIntensity={0.15}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function VehicleScene({
  kind,
  livery,
  autoRotate,
}: {
  kind: VehicleKind;
  livery: Livery;
  autoRotate: boolean;
}) {
  const camera = useMemo(() => ({ position: [5.5, 2.6, 6.5] as [number, number, number], fov: 42 }), []);

  return (
    <Canvas shadows dpr={[1, 2]} camera={camera}>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.6} color="#7fb6ff" />
      <Suspense fallback={null}>
        <Environment>
          <Lightformer intensity={2} position={[0, 6, 0]} scale={[12, 12, 1]} />
          <Lightformer
            intensity={1.1}
            color="#8fb8ff"
            position={[-6, 1, -2]}
            rotation-y={Math.PI / 2}
            scale={[20, 2, 1]}
          />
          <Lightformer
            intensity={0.8}
            color="#ffb066"
            position={[6, 2, 2]}
            rotation-y={-Math.PI / 2}
            scale={[20, 2, 1]}
          />
        </Environment>
        {kind === "jet" ? <Jet livery={livery} /> : <Tank livery={livery} />}
        <ContactShadows
          position={[0, kind === "jet" ? -1.6 : -0.52, 0]}
          opacity={0.5}
          scale={16}
          blur={2.6}
          far={6}
        />
      </Suspense>
      <OrbitControls
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
        minDistance={4}
        maxDistance={14}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
