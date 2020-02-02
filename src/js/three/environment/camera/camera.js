const THREE = require('three')

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
)
camera.position.set(20, 10, 30)
camera.zoom = 2
camera.lookAt(new THREE.Vector3(10, 0, 0))
// camera.position.y = -20;
camera.updateProjectionMatrix()

module.exports = camera
