// pages/api/og.ts
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge'
};

export default async function handler() {
  return new ImageResponse(
    (
      <div style={{
        background: 'black',
        color: 'white',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
      }}>
        Hello World
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: []
    }
  );
}
