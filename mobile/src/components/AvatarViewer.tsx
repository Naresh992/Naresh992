import React, { useMemo, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';

import { AvatarProfile, FittedGarment, getAvatarScale } from '../avatar/avatarEngine';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  profile: AvatarProfile;
  garments?: FittedGarment[];
  fullscreen?: boolean;
};

export function AvatarViewer({ profile, garments = [], fullscreen = false }: Props) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const scale = useMemo(() => getAvatarScale(profile), [profile]);
  const topGarment = garments.slice().sort((a, b) => b.layerIndex - a.layerIndex)[0];
  const pants = garments.find((item) => item.category === 'Pants');

  const panResponder = useMemo(
    () => PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        setRotation((value) => value + gesture.dx * 0.0025);
        setZoom(Math.max(0.82, Math.min(1.32, 1 + Math.abs(gesture.dy) * 0.0015)));
      },
      onPanResponderRelease: () => setZoom(1),
    }),
    [],
  );

  return (
    <View style={[styles.container, fullscreen && styles.fullscreen]} {...panResponder.panHandlers}>
      <Canvas style={styles.canvas} camera={{ position: [0, 1.55, 4.8], fov: 36 }}>
        <color attach="background" args={[colors.surface]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 5, 5]} intensity={1.6} />
        <pointLight position={[-2, 2, 3]} intensity={0.8} />
        <group rotation={[0, rotation, 0]} scale={[zoom, zoom, zoom]} position={[0, -1.38, 0]}>
          <mesh position={[0, 2.82 * scale.height, 0]}>
            <sphereGeometry args={[0.34, 48, 48]} />
            <meshStandardMaterial color={profile.skinTone} roughness={0.48} metalness={0.03} />
          </mesh>
          <mesh position={[0, 2.42 * scale.height, -0.02]} scale={[0.48, 0.16, 0.34]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#171717" roughness={0.72} />
          </mesh>
          <mesh position={[0, 1.86 * scale.height, 0]} scale={[0.62 * scale.torso, 0.92 * scale.height, 0.32]}>
            <capsuleGeometry args={[0.5, 0.86, 16, 40]} />
            <meshStandardMaterial color={topGarment?.color ?? profile.skinTone} roughness={0.54} metalness={0.02} />
          </mesh>
          <mesh position={[0, 1.1 * scale.height, 0]} scale={[0.52 * scale.hips, 0.42 * scale.height, 0.3]}>
            <capsuleGeometry args={[0.42, 0.35, 12, 32]} />
            <meshStandardMaterial color={pants?.color ?? profile.skinTone} roughness={0.58} />
          </mesh>
          <mesh position={[-0.24, 0.34 * scale.height, 0]} scale={[0.2, 0.95 * scale.legs, 0.2]}>
            <capsuleGeometry args={[0.32, 0.9, 12, 32]} />
            <meshStandardMaterial color={pants?.color ?? profile.skinTone} roughness={0.56} />
          </mesh>
          <mesh position={[0.24, 0.34 * scale.height, 0]} scale={[0.2, 0.95 * scale.legs, 0.2]}>
            <capsuleGeometry args={[0.32, 0.9, 12, 32]} />
            <meshStandardMaterial color={pants?.color ?? profile.skinTone} roughness={0.56} />
          </mesh>
          <mesh position={[-0.78 * scale.torso, 1.78 * scale.height, 0]} rotation={[0, 0, -0.18]} scale={[0.16, 0.76 * scale.height, 0.16]}>
            <capsuleGeometry args={[0.28, 0.9, 12, 32]} />
            <meshStandardMaterial color={topGarment?.color ?? profile.skinTone} roughness={0.56} />
          </mesh>
          <mesh position={[0.78 * scale.torso, 1.78 * scale.height, 0]} rotation={[0, 0, 0.18]} scale={[0.16, 0.76 * scale.height, 0.16]}>
            <capsuleGeometry args={[0.28, 0.9, 12, 32]} />
            <meshStandardMaterial color={topGarment?.color ?? profile.skinTone} roughness={0.56} />
          </mesh>
        </group>
      </Canvas>
      <View style={styles.hud}>
        <Text style={styles.hudTitle}>GLB Rig · Live Fit</Text>
        <Text style={styles.hudText}>Drag rotate · Pull zoom</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 420,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  fullscreen: {
    minHeight: 620,
  },
  canvas: {
    flex: 1,
  },
  hud: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(0,0,0,0.68)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    padding: spacing.lg,
  },
  hudTitle: {
    ...typography.subheading,
    color: colors.text,
  },
  hudText: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
});
