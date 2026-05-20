export type AvatarModelAsset = {
  id: string;
  gender: 'male' | 'female';
  modelUrl: string;
  skeleton: 'humanoid-v1';
  materialProfile: 'pbr-skin-v1';
};

export type GarmentModelAsset = {
  sku: string;
  modelUrl: string;
  category: string;
  attachmentBone: string;
  layerIndex: number;
  supportsPhysics: boolean;
};

export const avatarModelAssets: AvatarModelAsset[] = [
  {
    id: 'raritone-female-realistic-v1',
    gender: 'female',
    modelUrl: 'https://cdn.raritone.dev/models/avatars/raritone-female-realistic-v1.glb',
    skeleton: 'humanoid-v1',
    materialProfile: 'pbr-skin-v1',
  },
  {
    id: 'raritone-male-realistic-v1',
    gender: 'male',
    modelUrl: 'https://cdn.raritone.dev/models/avatars/raritone-male-realistic-v1.glb',
    skeleton: 'humanoid-v1',
    materialProfile: 'pbr-skin-v1',
  },
];

export const garmentModelAssets: GarmentModelAsset[] = [
  { sku: 'brown-jacket', modelUrl: 'https://cdn.raritone.dev/garments/brown-jacket.glb', category: 'Jackets', attachmentBone: 'spine.003', layerIndex: 3, supportsPhysics: true },
  { sku: 'black-jacket', modelUrl: 'https://cdn.raritone.dev/garments/black-jacket.glb', category: 'Jackets', attachmentBone: 'spine.003', layerIndex: 3, supportsPhysics: true },
  { sku: 'cream-shirt', modelUrl: 'https://cdn.raritone.dev/garments/cream-shirt.glb', category: 'Shirts', attachmentBone: 'spine.003', layerIndex: 2, supportsPhysics: true },
  { sku: 'wide-trouser', modelUrl: 'https://cdn.raritone.dev/garments/wide-trouser.glb', category: 'Pants', attachmentBone: 'hips', layerIndex: 1, supportsPhysics: true },
  { sku: 'runner-sneaker', modelUrl: 'https://cdn.raritone.dev/garments/runner-sneaker.glb', category: 'Shoes', attachmentBone: 'foot.L/R', layerIndex: 1, supportsPhysics: false },
];
