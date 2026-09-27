"use client";

import { useEffect, useState } from "react";
import {
  getShaderColorFromString,
  LiquidMetalShapes,
  liquidMetalFragmentShader,
  ShaderFitOptions,
} from "@paper-design/shaders";
import { ShaderMount } from "@paper-design/shaders-react";

/** Precomputed by brag-output/source/brand-mask.mjs, so visitors skip the costly shape processing. */
const MASK = "/brand/ks-liquid-metal.png";

// Chrome with a cobalt tint. colorBack is what's *behind* the shape, so it stays transparent: the
// page shows through the corners and the knocked-out letters. The tint gently burns the
// reflections toward the brand cobalt; colour fringing is kept low so it reads as polished metal.
const LOOK = {
  colorBack: "#00000000",
  // A near-white cobalt: the tint is colour-burned in, so anything darker turns the metal navy.
  colorTint: "#e4e9ff",
  repetition: 2,
  softness: 0.15,
  shiftRed: 0.12,
  shiftBlue: 0.18,
  distortion: 0.06,
  contour: 0.45,
  angle: 70,
};

type Props = { className?: string; still?: boolean; onReady?: () => void };

/**
 * The KS badge in liquid metal (Paper Shaders' shader fed our precomputed mask). Loaded lazily by
 * LiquidMetalMark; renders nothing until the mask image is in, then calls `onReady`.
 */
export default function LiquidMetalCanvas({
  className,
  still = false,
  onReady,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = MASK;
  }, []);

  useEffect(() => {
    if (!loaded) return;
    // Give WebGL two frames to draw before the layer is revealed.
    let id = requestAnimationFrame(
      () => (id = requestAnimationFrame(() => onReady?.())),
    );
    return () => cancelAnimationFrame(id);
  }, [loaded, onReady]);

  if (!loaded) return null;
  return (
    <ShaderMount
      className={className}
      fragmentShader={liquidMetalFragmentShader}
      mipmaps={["u_image"]}
      speed={still ? 0 : 1}
      frame={still ? 4000 : 0}
      uniforms={{
        u_image: MASK,
        u_isImage: true,
        u_shape: LiquidMetalShapes.none,
        u_colorBack: getShaderColorFromString(LOOK.colorBack),
        u_colorTint: getShaderColorFromString(LOOK.colorTint),
        u_repetition: LOOK.repetition,
        u_softness: LOOK.softness,
        u_shiftRed: LOOK.shiftRed,
        u_shiftBlue: LOOK.shiftBlue,
        u_distortion: LOOK.distortion,
        u_contour: LOOK.contour,
        u_angle: LOOK.angle,
        u_fit: ShaderFitOptions.contain,
        u_scale: 1,
        u_rotation: 0,
        u_offsetX: 0,
        u_offsetY: 0,
        u_originX: 0.5,
        u_originY: 0.5,
        u_worldWidth: 0,
        u_worldHeight: 0,
      }}
    />
  );
}
