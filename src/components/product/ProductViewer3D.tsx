"use client";

import { Suspense } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { ProductPlaceholderImage } from "./ProductPlaceholderImage";

function GltfModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} scale={1} />;
}

export function ProductViewer3D({
  modelSrc,
  image,
  label,
}: {
  modelSrc?: string;
  image?: string;
  label: string;
}) {
  if (modelSrc) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-gradient-to-br from-[#efe9df] to-[#e2d9c8]">
        <Canvas camera={{ position: [2.4, 1.6, 2.4], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 2]} intensity={1.1} />
          <Suspense fallback={null}>
            <GltfModel src={modelSrc} />
            <Environment preset="apartment" />
          </Suspense>
          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={5}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Canvas>
      </div>
    );
  }

  return (
    <div className="aspect-square w-full overflow-hidden rounded-sm">
      {image ? (
        <Image src={image} alt={label} width={900} height={900} className="h-full w-full object-cover" priority />
      ) : (
        <ProductPlaceholderImage label={label} className="h-full w-full" />
      )}
    </div>
  );
}
