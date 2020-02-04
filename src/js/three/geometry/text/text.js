const THREE = require('three')
import cansat_data from '../../../utils/cansat-data'
import { square_size, numOfMapLayers } from '../../../utils/hand-made-data'

const map_height = 4

const scene = require('../../environment/scene/scene')
const loader = new THREE.FontLoader()

const material = new THREE.MeshStandardMaterial({
  color: '#fff'
})
const input = document.getElementById('time-input')
const span = document.getElementById('time-value')

let data_to_arr = []
let my_font = null

function makeLabelCanvas(size, name) {
  const borderSize = 2
  const ctx = document.createElement('canvas').getContext('2d')
  const font = `${size}px Arial`
  ctx.font = font
  const doubleBorderSize = borderSize * 2
  const width = ctx.measureText(name).width + doubleBorderSize + 10
  const height = size + doubleBorderSize
  ctx.canvas.width = width
  ctx.canvas.height = height

  ctx.font = font
  ctx.textBaseline = 'top'

  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'black'
  ctx.fillText(name, borderSize, borderSize)

  return ctx.canvas
}
// PROD
// cansat_data()
//   .then(resp => {
//     data_to_arr = [...resp]
//     console.log(data_to_arr)
//   })
//   .then(() => {
//     loader.load('../../../assets/fonts/Arial_Regular.typeface.json', font => {
//       my_font = font
//     })
//   })
//   .then(() => {
//     input.max = data_to_arr.length - 2
//     input.value = 0

//     input.addEventListener('input', e => {
//       span.textContent = e.target.value

//       const objectToRemove = scene.getObjectByName('last_mesh')
//       scene.remove(objectToRemove)

//       const { height, time, pressure } = data_to_arr[e.target.value - 1]
//       const name = `height: ${height}m preassure: ${pressure}hPa time: ${time}s`

//       const size = 12
//       const canvas = makeLabelCanvas(size, name)
//       const texture = new THREE.CanvasTexture(canvas)
//       texture.minFilter = THREE.LinearFilter
//       texture.wrapS = THREE.ClampToEdgeWrapping
//       texture.wrapT = THREE.ClampToEdgeWrapping

//       const labelMaterial = new THREE.MeshBasicMaterial({
//         map: texture,
//         side: THREE.DoubleSide,
//         transparent: true
//       })

//       const labelGeometry = new THREE.PlaneBufferGeometry(8, 1)

//       const mesh = new THREE.Mesh(labelGeometry, labelMaterial)

//       mesh.position.set(
//         square_size * 1.25,
//         -1 * (square_size / 2) * numOfMapLayers +
//           (height * (square_size / 2) * (numOfMapLayers - 1)) / 3000,
//         0
//       )
//       mesh.name = `last_mesh`
//       scene.add(mesh)
//       console.log('after add scene')
//     })
//   })

// DEV
cansat_data()
  .then(resp => {
    data_to_arr = [...resp]
    console.log(data_to_arr)
  })
  .then(() => {
    loader.load('../../../assets/fonts/Arial_Regular.typeface.json', font => {
      my_font = font
    })
  })
  .then(() => {
    input.max = data_to_arr.length - 2
    input.value = 0

    input.addEventListener('input', e => {
      span.textContent = `${e.target.value}s`

      const objectToRemove = scene.getObjectByName('last_mesh')
      scene.remove(objectToRemove)

      const { height, time, pressure } = data_to_arr[e.target.value - 1]
      const name = `height: ${height}m preassure: ${pressure}hPa time: ${time}s`

      const size = 12
      const canvas = makeLabelCanvas(size, name)
      const texture = new THREE.CanvasTexture(canvas)
      texture.minFilter = THREE.LinearFilter
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping

      const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
      })

      const labelGeometry = new THREE.PlaneBufferGeometry(8, 1)

      const mesh = new THREE.Mesh(labelGeometry, labelMaterial)

      mesh.position.set(
        square_size * 1.25,
        -1 * (square_size / 2) * numOfMapLayers +
          (height * (square_size / 2) * (numOfMapLayers - 1)) / 3000,
        0
      )
      mesh.name = `last_mesh`
      scene.add(mesh)
      console.log('after add scene')
    })
  })
