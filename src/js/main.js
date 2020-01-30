const THREE = require("three");

const OrbitControls = require("three-orbitcontrols");
const camera = require("./environment/camera/camera");
const scene = require("./environment/scene/scene");
const light = require("./environment/light/light");

const cubes = require("./geometry/cube/cube");
const line = require("./geometry/line/line");
const skeleton = require("./geometry/skeleton/skeleton");

scene.add(light);

cubes.forEach(el => scene.add(el));
skeleton.forEach(el => scene.add(el));
scene.add(line);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
document.getElementById("canvas").append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enableKeys = true;
controls.target = new THREE.Vector3(0, -2, 0);
controls.autoRotate = true;
controls.update();

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};
animate();
