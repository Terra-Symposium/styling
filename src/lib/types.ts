export type ArrayOf12<T> = [T, T, T, T, T, T, T, T, T, T, T, T];
export type ColorScales = { light: ArrayOf12<string>; dark: ArrayOf12<string> };
export type ColorGenOpts = {
  accentLightness?: number;
  accentChroma?: number;
  hueAvoidanceShift?: number;
  hoverLightnessShift?: number;
  hoverChromaMultiplier?: number;
};
