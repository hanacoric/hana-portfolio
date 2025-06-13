// custom paints the background of the text when hovered
registerPaint(
  "textFill",
  class {
    static get inputProperties() {
      return ["--text-fill-progress", "--text-fill-color", "--text-color"];
    }

    static get contextOptions() {
      return { alpha: true };
    }

    paint(ctx, geom, props) {
      const progress = Math.min(
        Math.max(parseFloat(props.get("--text-fill-progress") || 0), 0),
        1
      );
      const fillColor =
        props.get("--text-fill-color").toString().trim() || "#9333ea";
      const textColor =
        props.get("--text-color").toString().trim() || "#ffffff";

      // Base color
      ctx.fillStyle = textColor;
      ctx.fillRect(0, 0, geom.width, geom.height);

      // Fill effect
      ctx.fillStyle = fillColor;
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillRect(0, 0, geom.width * progress, geom.height);
    }
  }
);
