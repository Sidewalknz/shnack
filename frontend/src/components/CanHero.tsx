'use client';

import dynamic from 'next/dynamic';

const CanScene = dynamic(() => import('@/components/CanScene'), { ssr: false });

export default function CanHero() {
  return (
    <div style={{ height: '80%', width: '80%' }}>
      <CanScene
        modelUrl="/models/can-vanilla.glb"
        textureUrl="/textures/can-vanilla.png"
      />
    </div>
  );
}
