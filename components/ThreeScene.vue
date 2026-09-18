<template>
  <canvas
    ref="canvas"
    style="width: 100vw; height: 100vh; display: block"
  ></canvas>
  <GltfModel
    path="/models/heart/jantung_normal_porto.glb"
    :position="[-1, 1, -3.0]"
    :scale="[3.0, 3.0, 3.0]"
    :rotation="[0, 0, 0]"
    @loaded="onModelLoaded"
  />

  <!-- Attribution caption fades in while hovering the heart. Bottom-center
       so it clears the model regardless of which side the model renders on
       per section. It's a sibling rendered after the section content in
       index.vue, so at equal z-index it still paints on top of section
       cards — on mobile, About/Experience/Project's cards run nearly
       full-height, so the caption can land over a card corner there; it
       stays readable (opaque chip) even when it's not floating in open
       space. -->
  <div
    class="fixed z-40 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 w-[85vw] max-w-xs bottom-6 text-[11px] sm:max-w-sm sm:text-xs sm:bottom-10 md:max-w-md md:text-sm lg:bottom-14"
    :class="isHeartHovered ? 'opacity-100' : 'opacity-0'"
  >
    <div
      class="rounded-md bg-white/90 text-zinc-800 px-3 py-2 md:px-4 md:py-3 shadow-lg shadow-black/20 backdrop-blur-md text-center leading-snug"
    >
      Heart Full Model ©2025 Universitas Gadjah Mada. Developed in partnership with MedimediXR, under Principal Investigator dr.Hasanah Mumpuni, SpPD, SpJP.
      My role: CCTA Segmentation, 3D Modelling and Animation, Web Development
    </div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSceneStore } from "~/stores/sceneStore";
// import gsap from "gsap";

const canvas = ref(null);

let renderer, scene, camera, animationId, controls;
let heartModel = null;

const sceneStore = useSceneStore();

const keysPressed = {};

// heart size/hover tuning
const HEART_DESKTOP_SCALE = 3.0;
const BASE_ROTATION_SPEED = 0.004;
const HOVER_LERP_FACTOR = 0.08;

let currentRotationSpeed = BASE_ROTATION_SPEED;

// Drives the attribution caption's fade — set from the raycaster hit-test
// in the animate loop below.
const isHeartHovered = ref(false);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-Infinity, -Infinity);

// shrink the heart on narrower viewports so it never overlaps the hero text
function getHeartScaleFactor() {
  const w = window.innerWidth;
  if (w < 768) return 0.4; // mobile
  if (w < 1024) return 0.6; // tablet
  return 1; // desktop
}

function onMouseMove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

const cameraPositions = [
  {
    position: new THREE.Vector3(6, 3.2, 0),
    target: new THREE.Vector3(0, 1, 0),
  },
  {
    position: new THREE.Vector3(1.854, 3.2, 5.706),
    target: new THREE.Vector3(0, 1, 0),
  },
  {
    position: new THREE.Vector3(-4.854, 3.2, 3.528),
    target: new THREE.Vector3(0, 1, 0),
  },
  {
    position: new THREE.Vector3(-6.03, 3.0, -4.5),
    target: new THREE.Vector3(-3.8, 1, 0),
  },
  {
    position: new THREE.Vector3(1.854, 3.0, -4.0),
    target: new THREE.Vector3(1, 1, 0),
  },
];

onMounted(() => {
  // create Scene
  scene = new THREE.Scene();
  scene.background = createGradientTexture(); // cream color

  // create Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    4000
  );
  camera.position.set(6, 3.2, 0); // angle
  camera.lookAt(0, 1, 0); // look at the center

  // create Renderer and bind canvas element
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true; // ✅ เปิดเงา
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // (optional) ทำให้เงานุ่ม

  // ✅ create OrbitControls (must be after camera and renderer)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // smooth movement
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  // All cameraPositions sit at radius ~6.4 from their target; minDistance
  // must stay below that or OrbitControls.update() clamps the camera back
  // out to minDistance every call, fighting the gsap position tween.
  controls.minDistance = 1;
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI / 2; // fixed angle
  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.target.set(0, 1, 0);
  controls.update();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("mousemove", onMouseMove);

  // setStore
  sceneStore.setCamera(camera);
  sceneStore.setControls(controls);
  sceneStore.setCameraPositions(cameraPositions);

  // light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);
  // Directional light (warm key)
  const directionalLight = new THREE.DirectionalLight(0xffe0c2, 1.2);
  directionalLight.position.set(12, 12, 8);
  directionalLight.target.position.set(0, 0, 0); // ส่องไปยังกลางพื้น
  directionalLight.castShadow = true;
  const shadowCam = directionalLight.shadow.camera;
  directionalLight.shadow.bias = -0.0015;
  directionalLight.shadow.normalBias = 0.03;
  // Tightened to the heart model's actual size (was a generous ±30 box) —
  // the wide frustum was spreading the shadow map's resolution too thin,
  // causing the acne at close camera distances.
  shadowCam.left = -8;
  shadowCam.right = 8;
  shadowCam.top = 8;
  shadowCam.bottom = -8;
  shadowCam.near = 1;
  shadowCam.far = 30;
  shadowCam.updateProjectionMatrix();
  scene.add(directionalLight);
  // light shadow
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;

  // Cool blue fill light, opposite the key — no shadows to avoid double-shadow artifacts
  const fillLight = new THREE.DirectionalLight(0xddeeff, 1.2);
  fillLight.position.set(-12, 8, -8);
  fillLight.target.position.set(0, 0, 0);
  fillLight.castShadow = false;
  scene.add(fillLight);

  const hemiLight = new THREE.HemisphereLight(0xcceeff, 0xffffff, 0.6);
  scene.add(hemiLight);

  let isScrolling = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleScroll = (event) => {
    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0) {
      sceneStore.nextSection();
    } else {
      sceneStore.prevSection();
    }

    sceneStore.moveCameraToCurrentSection();

    setTimeout(() => {
      isScrolling = false;
    }, 2000); // change the timeout duration to match the animation duration
  };
  // window.addEventListener("wheel", handleScroll);

  // Animation Loop
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    if (controls) {
      controls.update();
    }

    if (heartModel) {
      raycaster.setFromCamera(mouse, camera);
      const isHovering = raycaster.intersectObject(heartModel, true).length > 0;
      isHeartHovered.value = isHovering;

      // Hovering pauses idle rotation (lerped to 0) instead of speeding it
      // up, so the attribution caption is easy to read while it's shown.
      const targetRotationSpeed = isHovering ? 0 : BASE_ROTATION_SPEED;

      currentRotationSpeed = THREE.MathUtils.lerp(
        currentRotationSpeed,
        targetRotationSpeed,
        HOVER_LERP_FACTOR
      );

      heartModel.rotation.y += currentRotationSpeed;

      const scale = HEART_DESKTOP_SCALE * getHeartScaleFactor();
      heartModel.scale.set(scale, scale, scale);

      if (canvas.value) {
        canvas.value.style.cursor = isHovering ? "pointer" : "default";
      }
    }

    renderer.render(scene, camera);
  };

  animate();

  // resize screen
  window.addEventListener("resize", onWindowResize);
});

function onKeyDown(e) {
  keysPressed[e.key.toLowerCase()] = true;
}

function onKeyUp(e) {
  keysPressed[e.key.toLowerCase()] = false;
}

function onModelLoaded(mesh) {
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true; // send shadow
      child.receiveShadow = true; // receive shadow
    }
  });

  scene.add(mesh);
  heartModel = mesh;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function createGradientTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.sqrt(centerX ** 2 + centerY ** 2); // ระยะจากกลางถึงมุม

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius
  );
  gradient.addColorStop(0, "#ffffff"); // center
  gradient.addColorStop(1, "#a1a1aa"); // edges/corners

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

onBeforeUnmount(() => {
  window.removeEventListener("resize", onWindowResize);
  cancelAnimationFrame(animationId);
  controls.dispose(); // ✅ dispose controls
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("keyup", onKeyUp);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("wheel", handleScroll);
  renderer.dispose();

  scene.clear();
});
</script>

<style scoped>
#info {
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  z-index: 100;
  display: block;
}
</style>
