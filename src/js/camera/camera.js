const THREE = require("three");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.set(30, 30, 30);
camera.lookAt(new THREE.Vector3(0, 0, -100));
// camera.position.y = -20;

module.exports = camera;
