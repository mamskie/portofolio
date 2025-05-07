// lib/getFonts.ts
import type { Font } from 'satori';

export default async function getFonts(): Promise<Font[]> {
  const [regularFont, mediumFont] = await Promise.all([
    fetch('https://rsms.me/inter/font-files/Inter-Regular.woff').then((res) => res.arrayBuffer()),
    fetch('https://rsms.me/inter/font-files/Inter-Medium.woff').then((res) => res.arrayBuffer()),
  ]);

  return [
    {
      name: 'Inter',
      data: regularFont,
      style: 'normal',
      weight: 400,
    },
    {
      name: 'Inter',
      data: mediumFont,
      style: 'normal',
      weight: 500,
    },
  ];
}
