// Register the CSS Houdini Worklet
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(`
        registerPaint('eyeBackgroundEffect', class {
            static get inputProperties() { return ['--eye-color']; }
            
            paint(ctx, size, properties) {
                const eyeColor = properties.get('--eye-color').toString();
                
                // Draw a subtle circular gradient as background
                const gradient = ctx.createRadialGradient(
                    size.width/2, size.height/2, 0,
                    size.width/2, size.height/2, size.width/2
                );
                
                gradient.addColorStop(0, eyeColor);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(size.width/2, size.height/2, size.width/2, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    `);
}
