export const M = {
  colors: {
    black:   '#0A0A0A',
    white:   '#E8E8E8',
    accent:  '#C8FF00',
    red:     '#CC0000',
    gray:    '#6B6B6B',
    dimgray: '#2D2D2D',
  },
  fonts: {
    mono: "'Courier New', 'Courier', monospace",
    sans: "'Helvetica Neue', 'Arial', sans-serif",
  },
  tile: { w: 1080, h: 1080 },
  grid: { cols: 3, rows: 3, w: 3240, h: 3240 },
} as const;

// Tile numbering: IG order
// Visual grid (row=0 top, row=2 bottom):
// row=0: tiles 7,8,9
// row=1: tiles 4,5,6
// row=2: tiles 1,2,3
// tileNum = (2 - row) * 3 + col + 1
export function tileNum(col: number, row: number): number {
  return (2 - row) * 3 + col + 1;
}
