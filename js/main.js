import * as THREE from "three";
import { createStars } from "./stars-background.js";
import { Eye } from "./eye.js";
import { createTechBalls } from "./balls.js";

document.addEventListener("DOMContentLoaded", async () => {
  if ("paintWorklet" in CSS) {
    await CSS.paintWorklet.addModule("./css/houdini-worklet.js");
    console.log("Houdini registered");
  }

  const container = document.getElementById("stars-container");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    100,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create stars and add them to the scene
  const stars = createStars(scene);

  function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  new Eye("eye-container");

  document.querySelectorAll(".fill-hover").forEach((el) => {
    el.addEventListener("mouseenter", () => animateTextFill(el, true));
    el.addEventListener("mouseleave", () => animateTextFill(el, false));
  });
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

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  createTechBalls();
});
