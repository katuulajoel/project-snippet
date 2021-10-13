export const pxToRem = (pixels) => {
  const value = 1 * (pixels / 16);
  return `${value}rem`;
};

export const functions = {
  pxToRem,
};
