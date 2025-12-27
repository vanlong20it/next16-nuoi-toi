'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utils file, or remove if not

// --- constants ---
const COLS = 30; // Increased resolution
const ROWS = 30;
const CELL_SIZE = 20; // Visual size will be scaled by canvas CSS, detailed logic size
const CANVAS_WIDTH = COLS * CELL_SIZE;
const CANVAS_HEIGHT = ROWS * CELL_SIZE;
const COLORS = {
  background: '#0a0a0a',
  grid: '#171717',
  snakeHead: '#10b981', // Emerald 500
  snakeBody: '#34d399', // Emerald 400
  food: '#f43f5e',      // Rose 500
  text: '#ffffff'
};

// --- OOP Classes ---

class Vector2 {
  constructor(public x: number, public y: number) { }

  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  equals(v: Vector2) {
    return this.x === v.x && this.y === v.y;
  }
}

class Particle {
  position: Vector2;
  velocity: { x: number, y: number };
  life: number;
  color: string;
  size: number;

  constructor(x: number, y: number, color: string) {
    this.position = new Vector2(x, y);
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    this.life = 1.0;
    this.color = color;
    this.size = Math.random() * 3 + 2;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.life -= 0.03;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Snake {
  segments: Vector2[];
  direction: Vector2;
  nextDirection: Vector2;
  growPending: number;

  constructor() {
    this.segments = [
      new Vector2(10, 10),
      new Vector2(10, 11),
      new Vector2(10, 12)
    ];
    this.direction = new Vector2(0, -1); // Up
    this.nextDirection = new Vector2(0, -1);
    this.growPending = 0;
  }

  setDirection(dir: Vector2) {
    // Prevent 180 degree turns
    if (this.direction.x + dir.x === 0 && this.direction.y + dir.y === 0) return;
    // Allow queueing one move per frame (simplified here to just next)
    this.nextDirection = dir;
  }

  update() {
    this.direction = this.nextDirection;
    const head = this.segments[0];
    let newHead = head.add(this.direction);

    // Initial wrapping check to set logical position
    if (newHead.x < 0) newHead.x = COLS - 1;
    if (newHead.x >= COLS) newHead.x = 0;
    if (newHead.y < 0) newHead.y = ROWS - 1;
    if (newHead.y >= ROWS) newHead.y = 0;

    this.segments.unshift(newHead);

    if (this.growPending > 0) {
      this.growPending--;
    } else {
      this.segments.pop();
    }
  }

  checkCollision(): boolean {
    const head = this.segments[0];
    // Self collision (skip head)
    for (let i = 1; i < this.segments.length; i++) {
      if (head.equals(this.segments[i])) return true;
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLORS.snakeHead;

    this.segments.forEach((seg, i) => {
      const x = seg.x * CELL_SIZE;
      const y = seg.y * CELL_SIZE;

      ctx.fillStyle = i === 0 ? COLORS.snakeHead : COLORS.snakeBody;
      if (i === 0) {
        // slightly larger head
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      } else {
        // slightly smaller body for style
        ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      }
    });

    ctx.shadowBlur = 0; // Reset
  }
}

class Food {
  position: Vector2;

  constructor() {
    this.position = new Vector2(5, 5);
  }

  respawn(snake: Snake) {
    let valid = false;
    while (!valid) {
      const x = Math.floor(Math.random() * COLS);
      const y = Math.floor(Math.random() * ROWS);
      this.position = new Vector2(x, y);

      valid = !snake.segments.some(seg => seg.equals(this.position));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.position.x * CELL_SIZE + CELL_SIZE / 2;
    const y = this.position.y * CELL_SIZE + CELL_SIZE / 2;

    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = COLORS.food;
    ctx.fillStyle = COLORS.food;
    ctx.beginPath();
    ctx.arc(x, y, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Game {
  ctx: CanvasRenderingContext2D;
  snake: Snake;
  food: Food;
  particles: Particle[];
  score: number;
  status: 'IDLE' | 'PLAYING' | 'GAME_OVER';
  lastTime: number;
  gameInterval: number;
  timeSinceLastMove: number;

  constructor(ctx: CanvasRenderingContext2D, private onGameOver: (score: number) => void) {
    this.ctx = ctx;
    this.snake = new Snake();
    this.food = new Food();
    this.particles = [];
    this.score = 0;
    this.status = 'IDLE';
    this.lastTime = 0;

    this.gameInterval = 100; // ms per tick (speed)
    this.timeSinceLastMove = 0;
  }

  start() {
    this.snake = new Snake();
    this.food = new Food();
    this.particles = [];
    this.score = 0;
    this.status = 'PLAYING';
    this.timeSinceLastMove = 0;
    this.snake.nextDirection = new Vector2(0, -1); // Reset direction
    this.snake.direction = new Vector2(0, -1);
  }

  handleInput(key: string) {
    if (this.status !== 'PLAYING') return;

    switch (key) {
      case 'ArrowUp': this.snake.setDirection(new Vector2(0, -1)); break;
      case 'ArrowDown': this.snake.setDirection(new Vector2(0, 1)); break;
      case 'ArrowLeft': this.snake.setDirection(new Vector2(-1, 0)); break;
      case 'ArrowRight': this.snake.setDirection(new Vector2(1, 0)); break;
    }
  }

  update(deltaTime: number) {
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.status !== 'PLAYING') return;

    this.timeSinceLastMove += deltaTime;
    if (this.timeSinceLastMove >= this.gameInterval) {
      this.timeSinceLastMove = 0;

      this.snake.update();

      // Check Food
      const head = this.snake.segments[0];
      if (head.equals(this.food.position)) {
        this.snake.growPending++;
        this.score += 10;
        this.food.respawn(this.snake);
        this.spawnParticles(head.x * CELL_SIZE + CELL_SIZE / 2, head.y * CELL_SIZE + CELL_SIZE / 2, COLORS.food);

        // Speed up
        this.gameInterval = Math.max(50, this.gameInterval * 0.99);
      }

      if (this.snake.checkCollision()) {
        this.status = 'GAME_OVER';
        this.onGameOver(this.score);
      }
    }
  }

  spawnParticles(x: number, y: number, color: string) {
    for (let i = 0; i < 10; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  draw() {
    // Clear
    this.ctx.fillStyle = COLORS.background;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Grid (Subtle)
    this.ctx.strokeStyle = COLORS.grid;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (let x = 0; x <= CANVAS_WIDTH; x += CELL_SIZE) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, CANVAS_HEIGHT);
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += CELL_SIZE) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(CANVAS_WIDTH, y);
    }
    this.ctx.stroke();

    // Draw Game Objects
    this.food.draw(this.ctx);
    this.snake.draw(this.ctx);

    // Draw Particles
    this.particles.forEach(p => p.draw(this.ctx));
  }
}

// --- React Component ---

const GameContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const game = new Game(ctx, (finalScore) => {
      setGameState('GAME_OVER');
      // Score state is synced in loop via gameRef or we can just set it here if desired
    });
    gameRef.current = game;

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      game.update(deltaTime);
      game.draw();

      // Sync React State for UI (throttled ideally, but for now simple)
      if (game.score !== score) setScore(game.score);

      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    const handleKeyDown = (e: KeyboardEvent) => game.handleInput(e.key);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Run once on mount

  const handleStart = () => {
    if (gameRef.current) {
      gameRef.current.start();
      setGameState('PLAYING');
      setScore(0);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans text-white overflow-hidden relative selection:bg-emerald-500/30">
      <div className="max-w-4xl w-full flex flex-col items-center gap-8 z-10 relative">

        {/* Header */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            SNEAK
          </h1>
          <div className="mt-4 flex items-center gap-3 px-6 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md shadow-xl">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-mono text-xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
              {gameRef.current?.score || 0}
            </span>
          </div>
        </div>

        {/* Game Container */}
        <div className="relative group perspective-[1000px]">
          {/* Glow Effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>

          {/* Canvas Wrapper */}
          <div className="relative bg-neutral-900 rounded-lg border border-neutral-800 shadow-2xl overflow-hidden transform transition-transform duration-500">
            <canvas ref={canvasRef} className="block cursor-none touch-none" />

            {/* Overlays */}
            {gameState === 'IDLE' && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center animate-in fade-in duration-300">
                <Button
                  onClick={handleStart}
                  className="scale-125 bg-emerald-500 hover:bg-emerald-400 text-white font-black py-8 px-10 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-135 active:scale-110"
                >
                  <Play className="w-8 h-8 mr-2 fill-current" /> PLAY NOW
                </Button>
              </div>
            )}

            {gameState === 'GAME_OVER' && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center animate-in zoom-in duration-300">
                <h2 className="text-5xl font-black text-rose-500 mb-2 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]">GAME OVER</h2>
                <p className="text-2xl text-neutral-300 mb-8 font-light">Final Score: <span className="font-bold text-white">{score}</span></p>
                <Button
                  onClick={handleStart}
                  className="bg-white text-neutral-900 hover:bg-neutral-200 font-bold py-6 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  <RotateCcw className="mr-2" /> TRY AGAIN
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Controls Info */}
        <div className="text-neutral-500 text-sm font-mono flex gap-8 opacity-60">
          <span className="flex items-center gap-1"><kbd className="bg-neutral-800 px-2 py-1 rounded text-neutral-300">Arrows</kbd> to Move</span>
          <span className="hidden md:flex items-center gap-1"><kbd className="bg-neutral-800 px-2 py-1 rounded text-neutral-300">Space</kbd> to Boost</span>
        </div>

      </div>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-neutral-950/80 to-neutral-950"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px]"></div>
      </div>
    </div>
  );
}

export default GameContainer;