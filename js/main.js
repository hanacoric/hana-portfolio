import { Eye } from "./eye.js";

document.addEventListener("DOMContentLoaded", async () => {
  if ("paintWorklet" in CSS) {
    await CSS.paintWorklet.addModule("./css/houdini-worklet.js");
    console.log("Houdini registered");
  }
  new Eye("eye-container");
});

//animates the text from left to right when hovered
function animateTextFill(element, forward = true) {
  let start = null;
  const duration = 1200;

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);

    const value = forward ? progress : 1 - progress;
    element.style.setProperty("--text-fill-progress", value.toString());

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

document.querySelectorAll(".fill-hover").forEach((el) => {
  el.addEventListener("mouseenter", () => animateTextFill(el, true));
  el.addEventListener("mouseleave", () => animateTextFill(el, false));
});
