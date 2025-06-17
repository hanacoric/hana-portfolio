registerPaint(
  "noisePattern",
  class {
    paint(ctx, size) {
      const { width, height } = size;
      for (let i = 0; i < 8000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const alpha = Math.random() * 0.1 + 0.1;
        ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
  }
);
