export const routes = {
  splash: 'SplashScreen',
  loginOtp: 'LoginOtpScreen',
  socialLogin: 'SocialLoginScreen',
  cameraScan: 'CameraScanScreen',
  avatarPreview: 'AvatarPreviewScreen',
  tryOnStudio: 'TryOnStudioScreen',
  productList: 'ProductListScreen',
  productDetail: 'ProductDetailScreen',
  profileHome: 'ProfileHomeScreen',
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
