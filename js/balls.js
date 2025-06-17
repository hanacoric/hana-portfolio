import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createTechBalls() {
  const canvases = document.querySelectorAll(".tech-ball");

  canvases.forEach((canvas) => {
    const imgPath = canvas.dataset.img;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(150, 150);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 5);
    scene.add(ambientLight, directionalLight);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imgPath, (texture) => {
      const geometry = new THREE.IcosahedronGeometry(0.8, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        flatShading: true,
      });
      const ball = new THREE.Mesh(geometry, material);

      const decalMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
      });

      const plane = new THREE.PlaneGeometry(1, 1);
      const decal = new THREE.Mesh(plane, decalMaterial);
      decal.position.z = 0.8;

      ball.add(decal);
      scene.add(ball);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();
    });
  });
}
