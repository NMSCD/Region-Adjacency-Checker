export function useCoordConversion(coords: string): string {
  if (coords.length != 19) return coords;

  const X_Z_POS_SHIFT = 2049;
  const X_Z_NEG_SHIFT = 2047;
  const Y_POS_SHIFT = 129;
  const Y_NEG_SHIFT = 127;

  const x_coords = parseInt(coords.substring(0, 4), 16);
  const y_coords = parseInt(coords.substring(5, 9), 16);
  const z_coords = parseInt(coords.substring(10, 14), 16);
  const system_idx = parseInt(coords.substring(15, 19), 16);

  let portal_x = 0;
  let portal_y = 0;
  let portal_z = 0;
  if (x_coords < X_Z_NEG_SHIFT) {
    portal_x = x_coords + X_Z_POS_SHIFT;
  } else {
    portal_x = x_coords - X_Z_NEG_SHIFT;
  }
  if (z_coords < X_Z_NEG_SHIFT) {
    portal_z = z_coords + X_Z_POS_SHIFT;
  } else {
    portal_z = z_coords - X_Z_NEG_SHIFT;
  }
  if (y_coords < Y_NEG_SHIFT) {
    portal_y = y_coords + Y_POS_SHIFT;
  } else {
    portal_y = y_coords - Y_NEG_SHIFT;
  }

  const glyphs: string[] = [];
  glyphs[0] = '0';
  glyphs[1] = system_idx.toString(16).toUpperCase().padStart(3, '0');
  glyphs[2] = portal_y.toString(16).toUpperCase().padStart(2, '0');
  glyphs[3] = portal_z.toString(16).toUpperCase().padStart(3, '0');
  glyphs[4] = portal_x.toString(16).toUpperCase().padStart(3, '0');
  const glyphString = glyphs.join('');

  return glyphString.length == 12 ? glyphString : '';
}
