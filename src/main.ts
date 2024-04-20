import './style.css';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'dat.gui';

const scene = new THREE.Scene();
scene.add(new THREE.GridHelper());

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
camera.lookAt(0, .5, 0);

let moveCam = true;

const cameraPosition1 = new THREE.Vector3(3, .5, 3);
const cameraPosition2 = new THREE.Vector3(3, .5, -3);
const cameraPosition3 = new THREE.Vector3(-3, .5, -3);
const cameraPosition4 = new THREE.Vector3(-3, .5, 3);

camera.position.set(cameraPosition1.x, cameraPosition1.y, cameraPosition1.z);

function camMove() {
  if (moveCam) {
    // Square
    if (camera.position.x === cameraPosition2.x && camera.position.z > cameraPosition2.z) {
      camera.position.z -= 0.01;
    } else if (camera.position.x === cameraPosition2.x && camera.position.z < cameraPosition2.z) {
      camera.position.set(cameraPosition2.x, cameraPosition2.y, cameraPosition2.z);
      camera.position.x -= .01;
    } else if (camera.position.x > cameraPosition3.x && camera.position.z === cameraPosition3.z) {
      camera.position.x -= .01;
    } else if (camera.position.x < cameraPosition3.x && camera.position.z === cameraPosition3.z) {
      camera.position.set(cameraPosition3.x, cameraPosition3.y, cameraPosition3.z);
      camera.position.z += .01;
    } else if (camera.position.x === cameraPosition4.x && camera.position.z < cameraPosition4.z) {
      camera.position.z += .01;
    } else if (camera.position.x === cameraPosition4.x && camera.position.z > cameraPosition4.z) {
      camera.position.set(cameraPosition4.x, cameraPosition4.y, cameraPosition4.z);
      camera.position.x += .01;
    } else if (camera.position.x < cameraPosition1.x && camera.position.z === cameraPosition1.z) {
      camera.position.x += .01;
    } else {
      camera.position.set(cameraPosition1.x, cameraPosition1.y, cameraPosition1.z);
    }
  
    // Triangle
    // Circle
  }


}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);
cube.position.y = .5;
scene.add(cube);

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);
cameraFolder.add(camera, 'fov', 0, 180, .01).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, 'aspect', 0.00001, 10).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, 'near', 0.01, 10).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, 'far', 0.01, 10).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  camera.lookAt(cube.position);
  camMove();

  // cube.rotation.x += .01;
  // cube.rotation.y += .01;

  renderer.render(scene, camera);

  stats.update();
}

document.getElementById("cameraToggle")?.addEventListener("click", () => {
  moveCam = !moveCam;
});

animate();