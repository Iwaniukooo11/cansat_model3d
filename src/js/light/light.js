const THREE = require("three");

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 3, 1).normalize();

module.exports = light;
