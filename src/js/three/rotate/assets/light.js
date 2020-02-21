const THREE = require('three')

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(-6, 3, 6).normalize()

export default light
