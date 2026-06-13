import { useEffect, useRef } from 'react';

const DEFAULT_SETTINGS = {
  count: 80,
  minSize: 1,
  maxSize: 2.5,
  speed: 0.3,
  color: 'rgba(155, 100, 255, 0.4)'
};

type ParticleSettings = typeof DEFAULT_SETTINGS;

type MouseState = {
  x: number;
  y: number;
  radius: number;
};

class AntigravityParticle {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  vx: number;
  vy: number;
  density: number;

  constructor(canvas: HTMLCanvasElement, settings: ParticleSettings) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseX = this.x;
    this.baseY = this.y;

    this.size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
    this.vx = (Math.random() * 2 - 1) * settings.speed;
    this.vy = (Math.random() * 2 - 1) * settings.speed;
    this.density = Math.random() * 20 + 2;
  }

  draw(ctx: CanvasRenderingContext2D, color: string): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  update(mouse: MouseState, canvas: HTMLCanvasElement): void {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance < mouse.radius) {
      const force = (mouse.radius - distance) / mouse.radius;
      const dirX = dx / distance || 0;
      const dirY = dy / distance || 0;

      this.x -= dirX * force * this.density;
      this.y -= dirY * force * this.density;
    } else {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
  }
}

export function AntigravityBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { desynchronized: true });
    if (!ctx) return;

    const mouse: MouseState = { x: -1000, y: -1000, radius: 140 };
    const settings = {
      ...DEFAULT_SETTINGS,
      count: 100,
      speed: 0.7,
      color: 'rgba(155, 100, 255, 0.65)'
    };
    let animationFrame = 0;
    let particles: AntigravityParticle[] = [];

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: settings.count }, () => new AntigravityParticle(canvas, settings));
    };

    const handlePointerMove = (event: PointerEvent): void => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handlePointerLeave = (): void => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update(mouse, canvas);
        particle.draw(ctx, settings.color);
      }
      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className='antigravity-canvas' />;
}
