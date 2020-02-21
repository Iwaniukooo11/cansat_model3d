const THREE = require('three')

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
)
camera.position.set(1, 0, 1)
camera.zoom = 1
camera.lookAt(new THREE.Vector3(0, 0, 0))
camera.updateProjectionMatrix()

export default camera
