import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({autoPlace: false});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Fog
 */
const fog = new THREE.Fog("#262837", 1, 50);
// scene.fog = fog;
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const windowColorTexture = textureLoader.load(
  "/textures/windows/windowTexture.png"
);
const windowAmientOcclusionTexture = textureLoader.load(
  "/textures/windows/windowAmbientOcculent.png"
);
const windowNormalTexture = textureLoader.load(
  "/textures/windows/windowNormal.png"
);
const windowHeightTexture = textureLoader.load(
  "/textures/windows/windowDisplacement.png"
);
const doorColorTexture = textureLoader.load("/textures/doors/doorTexture.png");
const doorAmientOcclusionTexture = textureLoader.load(
  "/textures/doors/doorAmbientOcculent.png"
);
const doorNormalTexture = textureLoader.load("/textures/doors/doorNormal.png");
const doorHeightTexture = textureLoader.load(
  "/textures/doors/doorDisplacement.png"
);
const gateColorTexture = textureLoader.load(
  "/textures/gates/g_diffuseOriginal.png"
);
// const gateAlphaTexture = textureLoader.load("/textures/gates/maps_height.png");
const gateAmientOcclusionTexture = textureLoader.load(
  "/textures/gates/g_ao.png"
);
const gateNormalTexture = textureLoader.load("/textures/gates/g_normal.png");
const gateHeightTexture = textureLoader.load("/textures/gates/g_height.png");
const gateMetalicTexture = textureLoader.load("/textures/gates/g_metallic.png");

//? floor
const floorColorTexture = textureLoader.load(
  "/textures/floors/floorTexture.png"
);
const floorAmientOcclusionTexture = textureLoader.load(
  "/textures/floors/AmbientOcclusionMap.png"
);
const floorNormalTexture = textureLoader.load("/textures/floors/NormalMap.png");
const floorHeightTexture = textureLoader.load(
  "/textures/floors/DisplacementMap.png"
);

//? road
const roadColorTexture = textureLoader.load("/textures/roads/roadColor.jpeg");
const roadAmientOcclusionTexture = textureLoader.load(
  "/textures/roads/AmbientOcclusionMap.png"
);
const roadNormalTexture = textureLoader.load("/textures/roads/NormalMap.png");
const roadHeightTexture = textureLoader.load(
  "/textures/roads/DisplacementMap.png"
);

//? parking
const parkingColorTexture = textureLoader.load(
  "/textures/parkings/parkingColor.jpeg"
);
const parkingAmientOcclusionTexture = textureLoader.load(
  "/textures/parkings/AmbientOcclusionMap.png"
);
const parkingNormalTexture = textureLoader.load(
  "/textures/parkings/NormalMap.png"
);
const parkingHeightTexture = textureLoader.load(
  "/textures/parkings/DisplacementMap.png"
);

//?
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

//? roof

const roofColorTexture = textureLoader.load(
  "/textures/roofs/r_diffuseOriginal.png"
);
const roofAmbientOcclusionTexture = textureLoader.load(
  "/textures/roofs/r_ao.png"
);
const roofNormalTexture = textureLoader.load("/textures/roofs/r_normal.png");
const roofHeightTexture = textureLoader.load("/textures/roofs/r_height.png");
const roofMetallicTexture = textureLoader.load(
  "/textures/roofs/r_metallic.png"
);
// const roofsRoughnessTexture = textureLoader.load(
//   "/textures/roofs/roughness.jpg"
// );
/**
 * House
 */
const houseGroup = new THREE.Group();
scene.add(houseGroup);

const houseGeometry = new THREE.BoxGeometry(5, 2.5, 5);
const houseMaterial = new THREE.MeshStandardMaterial({
  map: bricksColorTexture,
  aoMap: bricksAmbientOcclusionTexture,
  transparent: true,
  normalMap: bricksNormalTexture,
  roughness: bricksRoughnessTexture,
});

const house1 = new THREE.Mesh(houseGeometry, houseMaterial);
house1.position.y = house1.geometry.parameters.height / 2;
house1.position.x = -5;
house1.position.z = -5;
house1.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(house1.geometry.attributes.uv.array, 2)
);
const house2 = new THREE.Mesh(houseGeometry, houseMaterial);
house2.position.y = house2.geometry.parameters.height / 2;
house2.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(house2.geometry.attributes.uv.array, 2)
);
houseGroup.add(house1, house2);
house2.position.x = 5;
house2.position.z = -5;

//? custom roof
const roofMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: roofColorTexture,
  aoMap: roofAmbientOcclusionTexture,
  transparent: true,
  displacementMap: roofHeightTexture,
  normalMap: roofNormalTexture,
  metalnessMap: roofMetallicTexture,
  // roughness: bricksRoughnessTexture,
});
const roofGroup = new THREE.Group();
scene.add(roofGroup);

//? house 1
const h1r1Geometry = new THREE.BufferGeometry();
const h1r1pArray = new Float32Array([2, 2.5, -2, 5.5, 5, -5, 8, 2.5, -2]);
const h1r1 = new THREE.BufferAttribute(h1r1pArray, 3);
h1r1Geometry.setAttribute("position", h1r1);

const roof5 = new THREE.Mesh(h1r1Geometry, roofMaterial);

const h1r2Geometry = new THREE.BufferGeometry();
const h1r2pArray = new Float32Array([8, 2.5, -2, 5.5, 5, -5, 8, 2.5, -7.8]);
const h1r2 = new THREE.BufferAttribute(h1r2pArray, 3);
h1r2Geometry.setAttribute("position", h1r2);
const roof6 = new THREE.Mesh(h1r2Geometry, roofMaterial);

const h1r3Geometry = new THREE.BufferGeometry();
const h1r3pArray = new Float32Array([8, 2.5, -7.8, 5.5, 5, -5, 2, 2.5, -7.8]);
const h1r3 = new THREE.BufferAttribute(h1r3pArray, 3);
h1r3Geometry.setAttribute("position", h1r3);
const roof7 = new THREE.Mesh(h1r3Geometry, roofMaterial);

const h1r4Geometry = new THREE.BufferGeometry();
const h1r4pArray = new Float32Array([2, 2.5, -7.8, 5.5, 5, -5, 2, 2.5, -2]);
const h1r4 = new THREE.BufferAttribute(h1r4pArray, 3);
h1r4Geometry.setAttribute("position", h1r4);
const roof8 = new THREE.Mesh(h1r4Geometry, roofMaterial);

roofGroup.add(roof5, roof6, roof7, roof8);

//? house 2
const h2r1Geometry = new THREE.BufferGeometry();
const h2r1pArray = new Float32Array([-8, 2.5, -2, -5.5, 5, -5, -2, 2.5, -2]);
const h2r1 = new THREE.BufferAttribute(h2r1pArray, 3);
h2r1Geometry.setAttribute("position", h2r1);
const roof1 = new THREE.Mesh(h2r1Geometry, roofMaterial);

const h2r2Geometry = new THREE.BufferGeometry();
const h2r2pArray = new Float32Array([-2, 2.5, -2, -5.5, 5, -5, -2, 2.5, -7.8]);
const h2r2 = new THREE.BufferAttribute(h2r2pArray, 3);
h2r2Geometry.setAttribute("position", h2r2);
const roof2 = new THREE.Mesh(h2r2Geometry, roofMaterial);

const h2r3Geometry = new THREE.BufferGeometry();
const h2r3pArray = new Float32Array([
  -2, 2.5, -7.8, -5.5, 5, -5, -8, 2.5, -7.8,
]);
const h2r3 = new THREE.BufferAttribute(h2r3pArray, 3);
h2r3Geometry.setAttribute("position", h2r3);
const roof3 = new THREE.Mesh(h2r3Geometry, roofMaterial);

const h2r4Geometry = new THREE.BufferGeometry();
const h2r4pArray = new Float32Array([-8, 2.5, -7.8, -5.5, 5, -5, -8, 2.5, -2]);
const h2r4 = new THREE.BufferAttribute(h2r4pArray, 3);
h2r4Geometry.setAttribute("position", h2r4);
const roof4 = new THREE.Mesh(h2r4Geometry, roofMaterial);

roofGroup.add(roof1, roof2, roof3, roof4);

/**
 * Fence group
 */
const fences = new THREE.Group();
scene.add(fences);
/**
 * Fences
 */
const fenceGeometry = new THREE.PlaneGeometry(20, 2);
const fenceMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});
const fence1 = new THREE.Mesh(fenceGeometry, fenceMaterial);
fence1.position.z = -10;
fence1.position.y = fence1.geometry.parameters.height / 2;
const fence2 = new THREE.Mesh(fenceGeometry, fenceMaterial);
fence2.rotation.x = Math.PI * 3;
fence2.position.y = fence2.geometry.parameters.height / 2;
fence2.position.z = 10;
const fence3 = new THREE.Mesh(fenceGeometry, fenceMaterial);
// fence3.position.z = -10
fence3.position.y = fence3.geometry.parameters.height / 2;
fence3.position.x = 10;
fence3.rotation.y = -Math.PI / 2;

const fence4 = new THREE.Mesh(fenceGeometry, fenceMaterial);
fence4.rotation.x = Math.PI * 3;
fence4.position.y = fence4.geometry.parameters.height / 2;
fence4.rotation.y = Math.PI / 2;
fence4.position.x = -10;
fences.add(fence1, fence2, fence3, fence4);

//? Gate
// const gateGeometry = new THREE.BoxGeometry(3, 3, .5);
// const gateMaterial = new THREE.MeshStandardMaterial({
//   side: THREE.DoubleSide,
//   color: 0xffffff,
//   map: gateColorTexture,
//   metalnessMap: gateMetalicTexture,
//   aoMap: gateAmientOcclusionTexture,
//   transparent: true,
//   normalMap: gateNormalTexture,
//   displacementMap: gateHeightTexture,
//   displacementScale: 0.1,
//   side: THREE.BackSide,
// });
// const gate = new THREE.Mesh(gateGeometry, gateMaterial);
// gate.position.y = gate.geometry.parameters.height / 2;
// gate.position.z = 9.8;
// gate.geometry.setAttribute(
//   "uv2",
//   new THREE.Float32BufferAttribute(gate.geometry.attributes.uv.array, 2)
// );
// scene.add(gate);

//? Doors

const doorGeometry = new THREE.PlaneGeometry(1, 2, 100, 100);
const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorColorTexture,
  aoMap: doorAmientOcclusionTexture,
  transparent: true,
  normalMap: doorNormalTexture,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
});
const door1 = new THREE.Mesh(doorGeometry, doorMaterial);
const door2 = new THREE.Mesh(doorGeometry, doorMaterial);
door1.position.set(6, 1, -2.49);
door2.position.set(-6, 1, -2.49);
houseGroup.add(door1, door2);

//? Windows
const windowGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
const windowMaterial = new THREE.MeshStandardMaterial({
  map: windowColorTexture,
  aoMap: windowAmientOcclusionTexture,
  transparent: true,
  normalMap: windowNormalTexture,
  displacementMap: windowHeightTexture,
  displacementScale: 0.1,
});

const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
const window3 = new THREE.Mesh(windowGeometry, windowMaterial);
const window4 = new THREE.Mesh(windowGeometry, windowMaterial);
const window5 = new THREE.Mesh(windowGeometry, windowMaterial);
const window6 = new THREE.Mesh(windowGeometry, windowMaterial);

window1.position.set(4, 1.5, -2.499);
window2.position.set(-4, 1.5, -2.499);
window3.rotation.y = -Math.PI / 2;
window3.position.set(2.499, 1.5, -3.5);
window4.rotation.y = Math.PI / 2;
window4.position.set(-2.499, 1.5, -3.5);
window5.rotation.y = -Math.PI / 2;
window5.position.set(2.499, 1.5, -6.5);
window6.rotation.y = Math.PI / 2;
window6.position.set(-2.499, 1.5, -6.5);
window1.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
);
window2.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(window2.geometry.attributes.uv.array, 2)
);
window3.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(window3.geometry.attributes.uv.array, 2)
);
window4.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(window4.geometry.attributes.uv.array, 2)
);
window5.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(window5.geometry.attributes.uv.array, 2)
);
window6.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(window6.geometry.attributes.uv.array, 2)
);

houseGroup.add(window1, window2, window3, window4, window5, window6);

//? Road
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 10, 100, 100),
  new THREE.MeshStandardMaterial({
    map: roadColorTexture,
    aoMap: roadAmientOcclusionTexture,
    displacementMap: roadHeightTexture,
    transparent: true,
    displacementScale: 0.1,
    normalMap: roadNormalTexture,
  })
);

// road.rotation.x = Math.PI
road.rotation.x = -Math.PI * 0.5;
road.position.y = 0.09;
road.position.z = 5;
scene.add(road);

road.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(road.geometry.attributes.uv.array, 2)
);

//? parkings
const parkGeometry = new THREE.PlaneGeometry(10, 7.5);
const parkMaterial = new THREE.MeshStandardMaterial({
  map: parkingColorTexture,
  aoMap: parkingAmientOcclusionTexture,
  transparent: true,
  normalMap: parkingNormalTexture,
});

const park1 = new THREE.Mesh(parkGeometry, parkMaterial);
park1.position.y = 0.099;
park1.rotation.x = -Math.PI * 0.5;
park1.rotation.z = Math.PI * 0.5;
park1.position.x = -6;
park1.position.z = 5;

scene.add(park1);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: floorColorTexture,
    aoMap: floorAmientOcclusionTexture,
    transparent: true,
    normalMap: floorNormalTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Pole
 */

// Create a cylinder geometry
var radiusTop = 0; // radius at the top
var radiusBottom = 0.5; // radius at the bottom
var height = 4; // height of the cylinder
var radialSegments = 32; // number of segments around the circumference
var heightSegments = 1; // number of segments along the height
var openEnded = false; // whether the ends of the cylinder are open or closed
var thetaStart = 0; // Start angle for first segment, in radians
var thetaLength = Math.PI * 2; // The central angle, in radians

var geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength
);

// Create a material
var poleMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

// Create a mesh
var poleMesh = new THREE.Mesh(geometry, poleMaterial);

poleMesh.position.y = poleMesh.geometry.parameters.height / 2;
// Add the mesh to the scene
scene.add(poleMesh);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.3);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#fffffff", 1);
moonLight.position.set(0, 3, 0);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

//? Spot Light

const pointLight1 = new THREE.PointLight(0xff7d56, 5, 5);
pointLight1.position.set(-5, 2.5, -2);
const pointLight2 = new THREE.PointLight(0xff7d56, 5, 5);
pointLight2.position.set(5, 2.5, -2);
const pointLight3 = new THREE.PointLight(0xff7d56, 5, 5);
pointLight3.position.set(-2, 2.5, -5);
const pointLight4 = new THREE.PointLight(0xff7d56, 5, 5);
pointLight4.position.set(2, 2.5, -5);

//? wall lights
const pointLight5 = new THREE.PointLight(0xffffff, 3, 5);
pointLight5.position.set(9.9, 1, -5);
const pointLight6 = new THREE.PointLight(0xff7d56, 3, 5);
pointLight6.position.set(-9.9, 1, -5);
const pointLight7 = new THREE.PointLight(0xffffff, 3, 5);
pointLight7.position.set(9.9, 1, 5);
const pointLight8 = new THREE.PointLight(0xff7d56, 3, 5);
pointLight8.position.set(-9.9, 1, 5);
const pointLight9 = new THREE.PointLight(0xffffff, 3, 5);
pointLight9.position.set(5, 1, 9);
const pointLight10 = new THREE.PointLight(0xff7d56, 3, 5);
pointLight10.position.set(-5, 1, 9);
const pointLight11 = new THREE.PointLight(0xff7d56, 3, 5);
pointLight11.position.set(0, 1, -9);
scene.add(
  pointLight1,
  pointLight2,
  pointLight3,
  pointLight4,
  pointLight5,
  pointLight6,
  pointLight7,
  pointLight8,
  pointLight9,
  pointLight10,
  pointLight11
);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 5;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837", 1);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
