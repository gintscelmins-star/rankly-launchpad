import { toPng } from "html-to-image";
import type { MutableRefObject } from "react";

export const exportTile = async (el: HTMLDivElement, mozaikaName: string, num: number) => {
  const dataUrl = await toPng(el, { width: 1080, height: 1080, pixelRatio: 1 });
  const a = document.createElement("a");
  a.download = `rankly-ig-${mozaikaName}-${String(num).padStart(2, "0")}.png`;
  a.href = dataUrl;
  a.click();
};

export const exportAll = async (
  refs: MutableRefObject<(HTMLDivElement | null)[]>,
  mozaikaName: string,
  tileNumFn: (col: number, row: number) => number,
) => {
  for (let row = 2; row >= 0; row--) {
    for (let col = 2; col >= 0; col--) {
      const i = row * 3 + col;
      const el = refs.current[i];
      if (el) {
        const num = tileNumFn(col, row);
        await exportTile(el, mozaikaName, num);
        await new Promise((r) => setTimeout(r, 600));
      }
    }
  }
};
