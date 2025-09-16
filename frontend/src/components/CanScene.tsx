'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useMemo, useRef } from 'react';

function alignLongestAxisToY(root: THREE.Object3D) {
  // Find the longest dimension and rotate it to become Y (upright)
  const box = new THREE.Box3().setFromObject(root);
  const s = box.getSize(new THREE.Vector3());
  // If Z is longest, rotate around X to bring Z -> Y
  if (s.z >= s.x && s.z >= s.y) {
    root.rotation.x = -Math.PI / 2;
  }
  // If X is longest, rotate around Z to bring X -> Y
  else if (s.x >= s.y && s.x >= s.z) {
    root.rotation.z = Math.PI / 2;
  }
  // If Y is already longest, do nothing
}

function centerAndScale(root: THREE.Object3D, targetHeight = 1.15) {
  // Center at origin
  const box1 = new THREE.Box3().setFromObject(root);
  const center = box1.getCenter(new THREE.Vector3());
  root.position.sub(center);

  // Scale so height matches targetHeight
  const box2 = new THREE.Box3().setFromObject(root);
  const size = box2.getSize(new THREE.Vector3());
  const scale = targetHeight / Math.max(size.y, 1e-6);
  root.scale.setScalar(scale);
}

function GLTFCan({ modelUrl, textureUrl }: { modelUrl: string; textureUrl?: string }) {
  const { scene } = useGLTF(modelUrl);
  const group = useRef<THREE.Group>(null!);

  // Load label texture (no hooks conditionally)
  const labelTexture = useMemo(() => {
    if (!textureUrl) return null;
    const tex = new THREE.TextureLoader().load(textureUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [textureUrl]);

  // One-time prep: orient upright, center/scale, and (optionally) apply label
  useMemo(() => {
    alignLongestAxisToY(scene);
    centerAndScale(scene, 1.15);

    if (labelTexture) {
      scene.traverse((obj: THREE.Object3D) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          const material = mesh.material as
            | THREE.MeshStandardMaterial
            | THREE.MeshPhysicalMaterial
            | THREE.MeshPhongMaterial
            | THREE.MeshBasicMaterial;

          if (material) {
            if (!('map' in material) || !material.map) {
              (material as THREE.MeshStandardMaterial).map = labelTexture;
            }
            if ('metalness' in material) {
              (material as THREE.MeshStandardMaterial).metalness ??= 0.25;
            }
            if ('roughness' in material) {
              (material as THREE.MeshStandardMaterial).roughness ??= 0.6;
            }
            material.side = THREE.FrontSide;
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, labelTexture]);

  // Gentle spin
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.5;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export default function CanScene({
  modelUrl = '/models/can-vanilla.glb',
  textureUrl = '/textures/can-vanilla.png',
}: {
  modelUrl?: string;
  textureUrl?: string;
}) {
  return (
    <Canvas
      // Start camera from the front (Z axis) so Bounds fits from the side
      camera={{ position: [0, 0, 5], fov: 45, near: 0.01, far: 1000 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1} />

      <Suspense fallback={null}>
        {/* Bounds auto-frames along the current camera direction */}
        <Bounds fit clip observe margin={1.35}>
          <GLTFCan modelUrl={modelUrl} textureUrl={textureUrl} />
        </Bounds>
        <Environment preset="city" />
      </Suspense>

      {/* Keep the camera around the equator (side view); users can spin around horizontally */}
      <OrbitControls
        makeDefault
        enableZoom
        minDistance={0.5}
        maxDistance={50}
        minPolarAngle={Math.PI / 2 - 0.05}
        maxPolarAngle={Math.PI / 2 + 0.05}
      />
    </Canvas>
  );
}

// Optional: preload
useGLTF.preload('/models/can-vanilla.glb');
