import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Eye {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found.`);
      return;
    }

    this.mouseX = 0;
    this.mouseY = 0;
    this.eyeModel = null;

    this.initScene();
    this.loadModel();
    this.addEvents();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Ambient + directional lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1.5);
    directional.position.set(5, 5, 5);
    this.scene.add(directional);
  }

  loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      "./models/eye.glb",
      (gltf) => {
        this.eyeModel = gltf.scene;

        // Reset transform
        this.eyeModel.position.set(0, 0, 0);
        this.eyeModel.scale.set(1.5, 1.5, 1.5);
        this.eyeModel.rotation.set(0, Math.PI, 0);

        this.scene.add(this.eyeModel);
        console.log("✅ Eye model loaded:", this.eyeModel);
      },
      undefined,
      (error) => {
        console.error("❌ Failed to load eye.glb:", error);
      }
    );
  }

  addEvents() {
    window.addEventListener("mousemove", (e) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("resize", () => {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.eyeModel) {
      this.eyeModel.lookAt(this.mouseX * 5, this.mouseY * 5, 0);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
