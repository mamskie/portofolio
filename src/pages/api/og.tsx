import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get('title') || 'Mamskie';
  const description = searchParams.get('description') || 'mamskie.me';
  const image = searchParams.get('image');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'black',
          color: 'white',
          height: '100%',
          width: '100%',
          fontSize: 48,
          fontFamily: '"Inter", sans-serif',
          textAlign: 'center',
          padding: 64,
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
              * { font-family: 'Inter', sans-serif; }
            `,
          }}
        />
        <div>{title}</div>
        <div style={{ fontSize: 24, marginTop: 16, color: '#ccc' }}>
          {description}
        </div>
        {image && (
          <img
            src={image}
            style={{ width: 400, height: 240, objectFit: 'cover', marginTop: 32 }}
            alt=""
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
