'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const SPIRAL_IMAGES = [
  '/assets/backgrounds/spiral-01.png',
  '/assets/backgrounds/spiral-02.png',
  '/assets/backgrounds/spiral-03.png',
  '/assets/backgrounds/spiral-04.png',
];

const INSTANCE_COUNT = 8;

interface SpiralInstance {
  src: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  opacity: number;
}

export function BackgroundSpirals() {
  const [instances, setInstances] = useState<SpiralInstance[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: INSTANCE_COUNT })?.map?.((_, i: number) => ({
      src: SPIRAL_IMAGES[i % SPIRAL_IMAGES.length],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 350 + Math.random() * 450,
      rotate: Math.random() * 360,
      opacity: 0.5 + Math.random() * 0.4,
    })) ?? [];
    setInstances(generated);
  }, []);

  if (!instances?.length) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {instances?.map?.((inst: SpiralInstance, i: number) => (
        <div
          key={i}
          className="absolute mix-blend-screen"
          style={{
            top: inst?.top,
            left: inst?.left,
            width: inst?.size,
            height: inst?.size,
            opacity: inst?.opacity,
            transform: `translate(-50%, -50%) rotate(${inst?.rotate ?? 0}deg)`,
            filter: 'brightness(4) contrast(1.3) saturate(1.4)',
          }}
        >
          <Image src={inst?.src ?? ''} alt="" fill className="object-contain" />
        </div>
      )) ?? []}
    </div>
  );
}
