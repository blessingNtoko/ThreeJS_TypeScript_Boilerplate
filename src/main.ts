import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'dat.gui';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.set(-2, 4, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

new OrbitControls(camera, renderer.domElement);

const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry();

console.log(boxGeometry);


const material = new THREE.MeshNormalMaterial({ wireframe: false });
// const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(boxGeometry, material);
cube.position.x = -4;
scene.add(cube);

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 0;
scene.add(sphere);

const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
icosahedron.position.x = 4;
scene.add(icosahedron);

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", 0, 20);
cameraFolder.add(camera.position, "y", 0, 20);
cameraFolder.add(camera.position, "z", 0, 20);
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += .01;
  // cube.rotation.y += .01;

  renderer.render(scene, camera);

  stats.update();
}

animate();