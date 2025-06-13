import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Eye {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found.`);
      return;
    }

    this.makeContainerCircular();

    this.mouse = new THREE.Vector2(0, 0);
    this.eyeModel = null;

    this.initScene();
    this.loadModel();
    this.addEvents();
    this.animate();
  }

  makeContainerCircular() {
    this.container.style.borderRadius = "50%";
    this.container.style.overflow = "hidden";
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 1.5;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.style.display = "block";
    this.container.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 3, 3);
    this.scene.add(directionalLight);
  }

  loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      "./models/eye.glb",
      (gltf) => {
        this.eyeModel = gltf.scene;
        this.eyeModel.traverse((child) => console.log(child.name));
        this.eyeModel.scale.set(0.2, 0.2, 0.2);
        this.eyeModel.rotation.set(0, 0, 0);
        this.eyeModel.position.set(0, 0, 0);
        this.scene.add(this.eyeModel);
        console.log("3D eye model loaded successfully");
      },
      undefined,
      (error) => {
        console.error("Error loading eye.glb:", error);
      }
    );
  }

  addEvents() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
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
      const sensitivity = 0.4;

      const target = new THREE.Vector3(
        this.mouse.x * sensitivity,
        this.mouse.y * sensitivity,
        this.camera.position.z - 1
      );

      this.eyeModel.lookAt(target);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
