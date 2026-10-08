"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { SYNDICATE_CHARACTERS, SyndicateCharacter } from "@/lib/characters-data";
import { SUITS } from "@/lib/suits-data";

const TEMP_SCALE_VEC = new THREE.Vector3();

interface Character3DCanvasProps {
  scrollProgress: number;
  scrollProgressRef?: React.MutableRefObject<number>;
  activeIndex: number;
  onSelectCharacter: (index: number) => void;
  imageSource?: "characters" | "suits";
}

// Single 3D Monolith Card in the Revolving Orbit
function OrbitCard({
  character,
  index,
  total,
  radius,
  isActive,
  texture,
  onClick,
}: {
  character: SyndicateCharacter;
  index: number;
  total: number;
  radius: number;
  isActive: boolean;
  texture: THREE.Texture | null;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Position on circular orbit in (X, Z) plane
  const angle = (index * 2 * Math.PI) / total;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  // Animate active card subtle floating bob and rotation
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Face radially outward from the center of the orbit
    meshRef.current.rotation.y = angle;

    // Active card subtle floating elevation
    const targetY = isActive ? 0.035 + Math.sin(state.clock.elapsedTime * 2.2) * 0.015 : 0;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      delta * 6
    );

    // Scale lerp: active card stands out prominently, background cards recede gracefully
    const targetScale = isActive ? 1.06 : hovered ? 0.94 : 0.80;
    TEMP_SCALE_VEC.set(targetScale, targetScale, targetScale);
    meshRef.current.scale.lerp(TEMP_SCALE_VEC, delta * 6);
  });

  const cardWidth = 0.98;
  const cardHeight = 1.36;
  const cardDepth = 0.035;

  return (
    <group
      ref={meshRef}
      position={[x, 0, z]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* 1. Core Obsidian Card Slab */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[cardWidth, cardHeight, cardDepth]} />
        <meshStandardMaterial
          color={isActive ? "#141311" : "#0A0A09"}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* 2. Brushed Gold Beveled Rim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[cardWidth + 0.03, cardHeight + 0.03, cardDepth - 0.008]} />
        <meshStandardMaterial
          color={isActive ? "#D4AF37" : hovered ? "#B59454" : "#4A3F2C"}
          roughness={0.2}
          metalness={0.9}
          emissive={isActive ? "#B59454" : "#000000"}
          emissiveIntensity={isActive ? 0.4 : 0}
        />
      </mesh>

      {/* 3. Front Portrait Texture Plane (Full-Bleed, Crisp) */}
      <mesh position={[0, 0, cardDepth / 2 + 0.002]}>
        <planeGeometry args={[cardWidth - 0.03, cardHeight - 0.03]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color={character.colorHex} roughness={0.4} />
        )}
      </mesh>

      {/* Inactive Card Shadow Overlay (Dims non-active cards so the active card pops) */}
      {!isActive && (
        <mesh position={[0, 0, cardDepth / 2 + 0.003]}>
          <planeGeometry args={[cardWidth - 0.03, cardHeight - 0.03]} />
          <meshBasicMaterial color="#000000" transparent opacity={hovered ? 0.2 : 0.48} />
        </mesh>
      )}

      {/* 4. Active Floor Accent Glow Ring */}
      {isActive && (
        <mesh position={[0, -cardHeight / 2 - 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.5, 32]} />
          <meshBasicMaterial
            color={character.accentColor}
            transparent
            opacity={0.85}
          />
        </mesh>
      )}

      {/* 5. Focused Spotlight for Active Front Card */}
      {isActive && (
        <pointLight
          position={[0, 0.3, 2.2]}
          color="#FFF5E0"
          intensity={2.8}
          distance={5.0}
        />
      )}
    </group>
  );
}

// 3D Scene Controller
function RevolvingCarouselScene({
  scrollProgress,
  scrollProgressRef,
  activeIndex,
  onSelectCharacter,
  imageSource = "characters",
}: {
  scrollProgress: number;
  scrollProgressRef?: React.MutableRefObject<number>;
  activeIndex: number;
  onSelectCharacter: (index: number) => void;
  imageSource?: "characters" | "suits";
}) {
  const carouselGroupRef = useRef<THREE.Group>(null);
  const total = SYNDICATE_CHARACTERS.length; // 7
  const radius = 2.65;

  // Preload all 7 textures (either character art or exact suit photography)
  const [textures, setTextures] = useState<Record<string, THREE.Texture>>({});

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loaded: Record<string, THREE.Texture> = {};
    let count = 0;

    SYNDICATE_CHARACTERS.forEach((char) => {
      const matchedSuit = SUITS.find((s) => s.id === char.suitId || s.id === char.id);
      const imageUrl =
        imageSource === "suits" && matchedSuit ? matchedSuit.image : char.image;

      loader.load(
        imageUrl,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          loaded[char.id] = tex;
          count++;
          if (count === total) {
            setTextures({ ...loaded });
          }
        },
        undefined,
        () => {
          count++;
        }
      );
    });
  }, [total, imageSource]);

  useFrame((state, delta) => {
    if (!carouselGroupRef.current) return;

    const currentProgress = scrollProgressRef
      ? scrollProgressRef.current
      : scrollProgress;

    // Target rotation derived from scroll progress
    const targetAngle = -(currentProgress * (total - 1) * ((2 * Math.PI) / total));

    // Mouse tilt response adds lively parallax
    const mouseTiltY = state.pointer.x * 0.15;

    carouselGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      carouselGroupRef.current.rotation.y,
      targetAngle + mouseTiltY,
      delta * 6
    );

    carouselGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      carouselGroupRef.current.rotation.x,
      -state.pointer.y * 0.08,
      delta * 6
    );
  });

  return (
    <>
      <ambientLight intensity={0.9} />

      {/* Key Directional Lighting */}
      <directionalLight
        position={[0, 6, 6]}
        intensity={2.6}
        color="#FFF4E0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Dramatic Crimson & Gold Noir Rim Lights */}
      <pointLight position={[-5, 3, -1]} intensity={2.2} color="#DC2626" />
      <pointLight position={[5, 3, -1]} intensity={2.0} color="#D4AF37" />

      {/* Floating Gold Sparkle Embers */}
      <Sparkles
        count={20}
        scale={[10, 5, 10]}
        size={1.8}
        speed={0.2}
        color="#D4AF37"
        opacity={0.35}
      />

      {/* The 3D Revolving Orbit Group positioned at Y = -0.16 for perfect top clearance and zero bottom cutoff */}
      <group ref={carouselGroupRef} position={[0, -0.16, 0]}>
        
        {/* Floor Orbit Rings */}
        <group position={[0, -0.72, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.04, radius + 0.04, 64]} />
            <meshBasicMaterial color="#B59454" transparent opacity={0.35} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.45, radius - 0.42, 64]} />
            <meshBasicMaterial color="#292826" transparent opacity={0.4} />
          </mesh>
        </group>

        {/* 7 Monolith Cards revolving on the circle */}
        {SYNDICATE_CHARACTERS.map((char, i) => (
          <OrbitCard
            key={char.id}
            character={char}
            index={i}
            total={total}
            radius={radius}
            isActive={activeIndex === i}
            texture={textures[char.id] || null}
            onClick={() => onSelectCharacter(i)}
          />
        ))}

        {/* Soft Floor Shadow - frames={1} eliminates per-frame secondary render passes */}
        <ContactShadows
          position={[0, -0.74, 0]}
          opacity={0.65}
          scale={radius * 3.4}
          blur={2.0}
          far={3.8}
          resolution={512}
          frames={1}
        />
      </group>
    </>
  );
}

export function Character3DCanvas({
  scrollProgress,
  scrollProgressRef,
  activeIndex,
  onSelectCharacter,
  imageSource = "characters",
}: Character3DCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full relative pointer-events-auto">
      <Canvas
        frameloop={isVisible ? "always" : "never"}
        shadows={false}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 6.5], fov: 38 }}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true, stencil: false }}
      >
        <RevolvingCarouselScene
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          activeIndex={activeIndex}
          onSelectCharacter={onSelectCharacter}
          imageSource={imageSource}
        />
      </Canvas>
    </div>
  );
}
