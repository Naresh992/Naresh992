import { Product } from '../data/products';

export type Gender = 'male' | 'female';
export type SkinTone = '#F1C6A8' | '#C58C67' | '#8D5A3B' | '#5C3828';

export type BodyMeasurements = {
  heightCm: number;
  shoulderCm: number;
  chestCm: number;
  waistCm: number;
  hipsCm: number;
  legCm: number;
};

export type AvatarProfile = {
  userId: string;
  gender: Gender;
  skinTone: SkinTone;
  hairPreset: 'crop' | 'bob' | 'waves' | 'fade';
  facePreset: 'oval' | 'square' | 'soft' | 'defined';
  measurements: BodyMeasurements;
  modelUrl: string;
};

export type FittedGarment = Product & {
  fittedScale: number;
  attachmentBone: string;
  layerIndex: number;
};

export type SavedOutfit = {
  id: string;
  name: string;
  products: FittedGarment[];
  savedAt: string;
};

export const defaultAvatarProfile: AvatarProfile = {
  userId: 'demo-user',
  gender: 'female',
  skinTone: '#C58C67',
  hairPreset: 'waves',
  facePreset: 'oval',
  measurements: {
    heightCm: 175,
    shoulderCm: 42,
    chestCm: 86,
    waistCm: 71,
    hipsCm: 96,
    legCm: 92,
  },
  modelUrl: 'https://cdn.raritone.dev/models/avatars/raritone-rigged-avatar.glb',
};

export function generateAvatarProfile(partial: Partial<AvatarProfile> = {}): AvatarProfile {
  return {
    ...defaultAvatarProfile,
    ...partial,
    measurements: {
      ...defaultAvatarProfile.measurements,
      ...partial.measurements,
    },
  };
}

export function getAvatarScale(profile: AvatarProfile) {
  const heightScale = profile.measurements.heightCm / 175;
  const chestScale = profile.measurements.chestCm / 86;
  const waistScale = profile.measurements.waistCm / 71;
  const hipScale = profile.measurements.hipsCm / 96;

  return {
    height: heightScale,
    torso: (chestScale + waistScale) / 2,
    waist: waistScale,
    hips: hipScale,
    legs: profile.measurements.legCm / 92,
  };
}

export function fitGarmentToAvatar(product: Product, profile: AvatarProfile): FittedGarment {
  const scale = getAvatarScale(profile);
  const categoryScale = product.category === 'Shoes' ? scale.height : product.category === 'Pants' ? scale.hips : scale.torso;

  return {
    ...product,
    fittedScale: Number(categoryScale.toFixed(2)),
    attachmentBone: product.category === 'Shoes' ? 'foot.L/R' : product.category === 'Pants' ? 'hips' : 'spine.003',
    layerIndex: product.category === 'Jackets' ? 3 : product.category === 'Shirts' ? 2 : 1,
  };
}

export function createSavedOutfit(products: FittedGarment[], name = 'Raritone Look'): SavedOutfit {
  return {
    id: `outfit-${Date.now()}`,
    name,
    products,
    savedAt: new Date().toISOString(),
  };
}
