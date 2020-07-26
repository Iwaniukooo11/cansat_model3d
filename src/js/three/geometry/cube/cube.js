const THREE = require('three')
import { square_size, numOfMapLayers } from '../../../utils/hand-made-data'
import scene from '../../environment/scene/scene'
import { map_3d } from '../../../utils/cansat-data'

const cubes_arr = []
let algorithm_arr = []

// const sumAllEarlierXY = (arr, index, type = 'x') => {
//   let sum = 0
//   let i = arr.length - 1
//   while (i >= 0) {
//     if (arr[i].index != index) {
//       sum += arr[i][type] * 1
//       i--
//       console.log('k', i == 0 ? '----------' : i)
//     } else break
//   }
//   return sum
// }

const toggler = document.querySelector('.onoffswitch-switch')
toggler.addEventListener('click', (e) => {
  console.log('CLICK TOGGLE', e.target.classList)
  toggler.classList.toggle('img-in-img')
  toggler.classList.toggle('segmentation')
  createCubeLayers(algorithm_arr)
})

const createCubeLayers = (algorithm_arr) => {
  console.log('received', algorithm_arr)
  const moveXY = {
    x: 0,
    y: 0,
  }
  for (let i = numOfMapLayers; 1 <= i; i--) {
    // console.log(i)
    moveXY.x += algorithm_arr[i - 1].x * 1
    moveXY.y += algorithm_arr[i - 1].y * 1
    console.log(moveXY)
    const objectToRemove = scene.getObjectByName(`cube-${i}`)
    scene.remove(objectToRemove)

    const folder = toggler.classList.contains('img-in-img')
      ? 'img_in_img'
      : 'segmentation'

    const texture = new THREE.TextureLoader().load(
      `assets/images_camera/${folder}/${i}.png`
    )

    texture.encoding = THREE.sRGBEncoding
    texture.anisotropy = 16

    const materialCube = new THREE.MeshStandardMaterial({
      color: '#fff',
      map: texture,
      opacity: 0.9999,
      emissive: 'rgb(255,255,255)',
      emissiveIntensity: 0.2,
      transparent: true,
    })

    const geometryCube = new THREE.BoxGeometry(square_size, 0.05, square_size)

    const geometryEdge = new THREE.EdgesGeometry(geometryCube)
    const materialEdge = new THREE.LineBasicMaterial({
      color: 0x4c4d4d,
      linewidth: 3,
    })
    const wireframe = new THREE.LineSegments(geometryEdge, materialEdge)
    wireframe.renderOrder = 1

    const cube = new THREE.Mesh(geometryCube, materialCube)
    cube.add(wireframe)

    cube.position.set(
      (-1 * (algorithm_arr[i - 1].x * 1 + moveXY.x)) /
        (algorithm_arr[i - 1].size / square_size),
      -1 * (square_size / 2) * i,
      (-1 * (algorithm_arr[i - 1].y * 1 + moveXY.y)) /
        (algorithm_arr[i - 1].size / square_size)
    ) //!!
    cube.name = `cube-${i}`
    scene.add(cube)
  }
}

map_3d().then((res) => {
  console.log('res: ')
  algorithm_arr = [...res].reverse()
  // console.log('algo arr: ', algorithm_arr)
  createCubeLayers([...res].reverse())
})

export default cubes_arr
