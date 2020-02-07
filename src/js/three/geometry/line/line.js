const THREE = require('three')
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {
  square_size,
  image_in_image_data,
  numOfMapLayers
} from '../../../utils/hand-made-data'
import scene from '../../environment/scene/scene'

let icon = ''

// const icon_loader = new OBJLoader()
// icon_loader.load(
//   '../../../../assets/3d/cansat_icon.obj',
//   resp => {
//     icon = resp
//     icon.scale.set(0.005, 0.005, 0.005)
//     console.log('ich habe!', icon)
//   },
//   null,
//   err => console.log('err icon', err)
// )
const icon_loader = new GLTFLoader()
icon_loader.load(
  '../../../../assets/3d/cansat_icon.glb',
  resp => {
    icon = resp.scene
    icon.scale.set(0.005, 0.005, 0.005)
    console.log('ich habe!', icon)
  },
  null,
  err => console.log('err icon', err)
)

const input = document.getElementById('time-input')
const layers_coord = []

const geometryLine = new THREE.Geometry()
const material_line = new THREE.LineBasicMaterial({
  // color: 0x0000ff,
  // color: 0x5352ed,
  color: 0xff435f,
  linewidth: 4
})

for (let i = 0; i < image_in_image_data.length - 1; i++) {
  const x = image_in_image_data[i][0]
  const y = image_in_image_data[i][1]
  const size_curent = image_in_image_data[i][2]
  // const size_next = image_in_image_data[i + 1][2]
  const size_next =
    size_curent * (image_in_image_data[i + 1][3] / image_in_image_data[i][3])

  const vec_x =
    (square_size * (x + size_next / 2)) / size_curent - square_size / 2
  // (square_size * (x + size_curent / 2)) / size_curent
  const vec_y =
    (square_size * (y + size_next / 2)) / size_curent - square_size / 2
  // (square_size * (y + size_curent / 2)) / size_curent

  const vec_z = -1 * (square_size / 2) * (i + 1)

  geometryLine.vertices.push(new THREE.Vector3(vec_x, vec_z, vec_y))
  layers_coord.push([vec_x, vec_z, vec_y, `layer-${i}`])
}

geometryLine.vertices.push(
  new THREE.Vector3(0, -1 * (square_size / 2) * image_in_image_data.length, 0)
)
layers_coord.push([0, -1 * (square_size / 2) * image_in_image_data.length, 0])

const line = new THREE.Line(geometryLine, material_line)

const material_cube = new THREE.MeshStandardMaterial({
  // color: '#ff0000'
  color: '#ff435f'
})
const geometry_cube = new THREE.BoxGeometry(0.35, 0.35, 0.35)

input.addEventListener('input', e => {
  const objectToRemove = scene.getObjectByName('falling_probe')
  scene.remove(objectToRemove)

  const cube = icon ? icon : new THREE.Mesh(geometry_cube, material_cube)
  console.log('Icon: ', icon)

  const cube_z =
    -1 * (square_size / 2) * numOfMapLayers +
    ((input.max - e.target.value) * (square_size / 2) * (numOfMapLayers - 1)) /
      input.max

  //find the closer z
  let part_of_map = layers_coord.length - 1
  for (let i = 0; i < layers_coord.length - 1; i++) {
    if (cube_z < layers_coord[i][1] && cube_z > layers_coord[i + 1][1]) {
      part_of_map = i
      break
    }
  }

  const distanceFromHigherLayer = layers_coord[part_of_map][1] - cube_z
  const heightOfLayer =
    layers_coord[part_of_map][1] - layers_coord[part_of_map + 1][1]

  const y_differ =
    layers_coord[part_of_map][2] - layers_coord[part_of_map + 1][2]
  const x_differ =
    layers_coord[part_of_map][0] - layers_coord[part_of_map + 1][0]

  // compute from proportions
  const cube_x =
    layers_coord[part_of_map][0] -
    (distanceFromHigherLayer * x_differ) / heightOfLayer

  const cube_y =
    layers_coord[part_of_map][2] -
    (distanceFromHigherLayer * y_differ) / heightOfLayer

  console.log(part_of_map)
  cube.position.set(cube_x, cube_z, cube_y)
  cube.name = 'falling_probe'
  scene.add(cube)
})

export default line
