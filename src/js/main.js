//todo - require to import

const THREE = require("three");

const OrbitControls = require("three-orbitcontrols");
const camera = require("./three/environment/camera/camera");
const scene = require("./three/environment/scene/scene");
const light = require("./three/environment/light/light");

import cubes from "./three/geometry/cube/cube";
import line from "./three/geometry/line/line";
const skeleton = require("./three/geometry/skeleton/skeleton");
const text = require("./three/geometry/text/text");

// const db = require("./database/database");
// const ref = db.collection("Serial_Port_Monitor");

import test from "./utils/cansat-data";
test();

scene.add(light);

cubes.forEach(el => scene.add(el));
skeleton.forEach(el => scene.add(el));
scene.add(line);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.85);
document.getElementById("canvas-three").append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enableKeys = true;
controls.target = new THREE.Vector3(1, -2, -1);
// controls.autoRotate = true;
controls.update();

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};
animate();

//chart.js
const Chart = require("chart.js");

const conf_acceleration = require("./chart/charts/acceleration");
const ctx_acceleration = document.getElementById("canvas-chart-acceleration");
// console.log(ctx);

const myChart = new Chart(ctx_acceleration, conf_acceleration);
