export const SYMBOLS = 4; // Symbols per reel + 1 extra to avoid top gap
export const WIDTH = 120;
export const HEIGHT = 180;
export const GAP = 10;
export const STEP = HEIGHT + GAP;
export const VISIBLE_HEIGHT = 3 * STEP - GAP; // Visible area showing 3 symbols with spacing

// Responsive constants
export const TARGET_WIDTH = 500; // Width for desktop
export const TARGET_HEIGHT = 500; // Height for desktop
export const MOBILE_BREAKPOINT = 768; // Mobile breakpoint
