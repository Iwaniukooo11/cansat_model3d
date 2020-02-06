const THREE = require('three')
import { square_size, numOfMapLayers } from '../../../utils/hand-made-data'

const cubes_arr = []

for (let i = numOfMapLayers; 1 <= i; i--) {
  const texture = new THREE.TextureLoader().load(
    // `http://192.168.1.15:3000/assets/images_camera/a-${i}.JPG`
    `assets/images_camera/a-${i}.png`
  )

  texture.encoding = THREE.sRGBEncoding
  texture.anisotropy = 16

  const materialCube = new THREE.MeshStandardMaterial({
    color: '#fff',
    map: texture,
    opacity: 0.95,
    emissive: 'rgb(255,255,255)',
    emissiveIntensity: 0.2,
    transparent: true
  })

  // console.log('create', Date.now() % 10)
  const geometryCube = new THREE.BoxGeometry(square_size, 0.05, square_size)

  const geometryEdge = new THREE.EdgesGeometry(geometryCube)
  const materialEdge = new THREE.LineBasicMaterial({
    // color: 0x999999,
    color: 0x4c4d4d,
    // color: 0xff435f,
    linewidth: 3
  })
  const wireframe = new THREE.LineSegments(geometryEdge, materialEdge)
  wireframe.renderOrder = 1 // make sure wireframes are rendered 2nd

  const cube = new THREE.Mesh(geometryCube, materialCube)
  cube.add(wireframe)

  cube.position.set(0, -1 * (square_size / 2) * i, 0) //!!
  cubes_arr.push(cube)
}

export default cubes_arr
