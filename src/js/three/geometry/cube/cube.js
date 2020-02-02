const THREE = require('three')
// const square_size = 4 //also in line.js
import { square_size } from '../../../utils/hand-made-data'

const cubes_arr = []

// const numOfMapLayers = require("../../../utils/data");
import { numOfMapLayers } from '../../../utils/hand-made-data'

for (let i = numOfMapLayers; 1 <= i; i--) {
  const texture = new THREE.TextureLoader().load(
    `http://192.168.1.15:3000/assets/images_camera/${i}.png`
  )

  texture.encoding = THREE.sRGBEncoding
  texture.anisotropy = 16

  const material = new THREE.MeshStandardMaterial({
    color: '#fff',
    map: texture,
    emissive: 'rgb(255,255,255)',
    emissiveIntensity: 0.2
    // transparent: true
  })

  // const geometryCube = new THREE.BoxGeometry(2, 0.05, 2);
  const geometryCube = new THREE.BoxGeometry(square_size, 0.05, square_size)
  const cube = new THREE.Mesh(geometryCube, material)
  cube.position.set(0, -1 * (square_size / 2) * i, 0) //!!
  cubes_arr.push(cube)
}

export default cubes_arr
