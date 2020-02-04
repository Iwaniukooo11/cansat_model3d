const THREE = require('three')
// const square_size = 4; //also in cube.js
import {
  square_size,
  image_in_image_data,
  numOfMapLayers
} from '../../../utils/hand-made-data'
// import { image_in_image_data } from '../../../utils/hand-made-data'

const input = document.getElementById('time-input')
const layers_coord = []
const scene = require('../../environment/scene/scene')

const geometryLine = new THREE.Geometry()
const material_line = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 2
})

for (let i = 0; i < image_in_image_data.length - 1; i++) {
  const x = image_in_image_data[i][0]
  const y = image_in_image_data[i][1]
  const size_curent = image_in_image_data[i][2]
  const size_next = image_in_image_data[i + 1][2]

  const vec_x =
    (square_size * (x + size_next / 2)) / size_curent - square_size / 2
  const vec_y =
    (square_size * (y + size_next / 2)) / size_curent - square_size / 2
  const vec_z = -1 * (square_size / 2) * (i + 1)

  // geometryLine.vertices.push(
  //   new THREE.Vector3(
  //     (square_size * (x + size_next / 2)) / size_curent - square_size / 2,
  //     // -1 * (i + 1), //!
  //     -1 * (square_size / 2) * (i + 1),
  //     (square_size * (y + size_next / 2)) / size_curent - square_size / 2
  //   )
  // )
  geometryLine.vertices.push(new THREE.Vector3(vec_x, vec_z, vec_y))
  layers_coord.push([vec_x, vec_z, vec_y, `layer-${i}`])
}

geometryLine.vertices.push(
  new THREE.Vector3(0, -1 * (square_size / 2) * image_in_image_data.length, 0)
)
layers_coord.push([
  0,
  -1 * (square_size / 2) * image_in_image_data.length,
  0,
  `layer-${image_in_image_data.length}`
])

const line = new THREE.Line(geometryLine, material_line)

const material_cube = new THREE.MeshStandardMaterial({
  color: '#ff0000'
})
const geometry_cube = new THREE.BoxGeometry(0.35, 0.35, 0.35)

console.log(layers_coord)
input.addEventListener('input', e => {
  const objectToRemove = scene.getObjectByName('falling_probe')
  scene.remove(objectToRemove)

  const cube = new THREE.Mesh(geometry_cube, material_cube)

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

  // console.log(part_of_map, '/', layers_coord.length)

  // const distanceFromHigherLayer = cube_z - layers_coord[part_of_map][1]
  const distanceFromHigherLayer = layers_coord[part_of_map][1] - cube_z
  const heightOfLayer =
    layers_coord[part_of_map][1] - layers_coord[part_of_map + 1][1]

  // const ratio_x =
  //   distanceFromHigherLayer /
  //   (layers_coord[part_of_map][1] - layers_coord[part_of_map + 1][1])

  // const ratio_y =
  //   distanceFromHigherLayer /
  //   (layers_coord[part_of_map][2] - layers_coord[part_of_map + 1][2])
  const y_differ =
    layers_coord[part_of_map][2] - layers_coord[part_of_map + 1][2]
  const x_differ =
    layers_coord[part_of_map][0] - layers_coord[part_of_map + 1][0]

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
