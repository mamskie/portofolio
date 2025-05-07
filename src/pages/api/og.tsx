/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import type { CSSProperties } from 'react';
import type { PageConfig } from 'next';
import type { NextRequest } from 'next/server';
// import getFonts from '@lib/getFonts'; // pastikan path ini sesuai dengan lokasi file kamu
// import { PUBLIC_URL } from '@lib/env';
import getFonts from '../../../lib/getFonts';
import { PUBLIC_URL } from '../../../lib/env';


export const config: PageConfig = {
  runtime: 'edge',
};

const gradientTitleStyles: Pick<
  CSSProperties,
  'color' | 'backgroundClip' | 'backgroundImage'
> = {
  color: 'transparent',
  backgroundClip: 'text',
  backgroundImage: 'linear-gradient(to right, #0011FFFF, #00FFFFFF)',
};

export default async function handler(
  req: NextRequest
): Promise<ImageResponse> {
  const fonts = await getFonts(); // Ambil font dari CDN

  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type');
  const title = searchParams.get('title');
  const image = searchParams.get('image');
  const article = searchParams.get('article');
  const description = searchParams.get('description');

  const isHomepage = title === 'Mamskie';

  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-black p-8 text-white">
        {article ? (
          <div tw="flex w-full justify-between">
            <div tw="flex flex-col justify-between">
              <div tw="flex flex-col">
                <p tw="-my-2 text-xl font-medium text-gray-400">
                  mamskie.me/{type}
                </p>
                <h2 style={gradientTitleStyles} tw="max-w-xl text-4xl">
                  {title}
                </h2>
              </div>
              <div tw="flex items-center">
                <img
                  style={{ objectFit: 'cover' }}
                  tw="h-18 w-18 rounded-full"
                  src={`${PUBLIC_URL}/assets/emilia.png`}
                  alt="Emilia"
                />
                <div tw="ml-4 flex flex-col">
                  <p tw="-mb-4 text-2xl font-medium">M. Khotibul Umam</p>
                  <p tw="text-lg font-medium text-gray-400">@mamskie</p>
                </div>
              </div>
            </div>
            <img
              style={{ objectFit: 'cover' }}
              tw="h-full w-[448px] rounded-md"
              src={image as string}
              alt={title as string}
            />
          </div>
        ) : (
          <div tw="flex w-full flex-col items-center justify-center">
            <img
              tw="h-24 w-24"
              src={`${PUBLIC_URL}/logo512.png`}
              alt="mamskie.me's logo"
            />
            <h2 style={gradientTitleStyles} tw="pb-1 text-6xl">
              {isHomepage ? 'Mamskie' : title}
            </h2>
            {!isHomepage && (
              <p tw="text-2xl font-medium text-gray-200">mamskie.me</p>
            )}
            <p tw="max-w-4xl text-center text-2xl text-gray-300">
              {description}
            </p>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts, // Load fonts from helper
    }
  );
}
