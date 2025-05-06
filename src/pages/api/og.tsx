import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get('title') || 'Mamskie';
  const description = searchParams.get('description') || 'mamskie.me';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '48px',
          textAlign: 'center',
        }}
      >
        <div>{title}</div>
        <div style={{ fontSize: '24px', color: '#ccc', marginTop: '16px' }}>
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
