const THREE = require('three')
import cansat_data from '../../../utils/cansat-data'
import { square_size, numOfMapLayers } from '../../../utils/hand-made-data'

import scene from '../../environment/scene/scene'
const loader = new THREE.FontLoader()

const input = document.getElementById('time-input')
const span = document.getElementById('time-value')

let data_to_arr = []
let my_font = null

const makeLabelCanvas = (size, name) => {
  const borderSize = 2
  const ctx = document.createElement('canvas').getContext('2d')
  // const font = `${size}px Arial`
  const font = `${size}px Open Sans`
  ctx.font = font
  const doubleBorderSize = borderSize * 2
  const width = ctx.measureText(name).width + doubleBorderSize + 10
  const height = size + doubleBorderSize
  ctx.canvas.width = width
  ctx.canvas.height = height

  ctx.font = font
  ctx.textBaseline = 'top'
  ctx.textAlign = 'left'

  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'black'
  // ctx.fillText(`${name} aleblebleblebleble`, borderSize, borderSize)
  ctx.fillText(`${name}`, borderSize, borderSize)

  return ctx.canvas
}

cansat_data()
  .then(resp => {
    data_to_arr = [...resp]
    // console.log('received data from database: ', data_to_arr)
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
      // const name = `height: ${height}m preassure: ${pressure}hPa time: ${time}s`
      const name = [
        { pressure: pressure, unit: 'hPa' },
        { time: time, unit: 's' },
        { height: height, unit: 'm' }
      ]
      const size = 12

      // const labelGeometry = new THREE.PlaneBufferGeometry(8, 1)
      let i = -1
      const arr_canvas = []
      // name.forEach((el, i) => {
      for (const el of name) {
        // if (i == 0) return 0
        const key = Object.keys(el)[0]
        const content = `${key}: ${el[key]} ${el['unit']}`

        i++
        const labelGeometry = new THREE.PlaneBufferGeometry(
          parseInt(content.length / 4) + 1,
          // 6,
          1
        )

        const objectToRemove = scene.getObjectByName(`last_mesh-${key}`)
        scene.remove(objectToRemove)

        // const canvas = makeLabelCanvas(size, el[key])
        const canvas = makeLabelCanvas(size, content)

        console.log(key)
        const texture = new THREE.CanvasTexture(canvas)
        texture.minFilter = THREE.LinearFilter
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping

        const labelMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true
        })

        arr_canvas.push(canvas)

        const mesh = new THREE.Mesh(labelGeometry, labelMaterial)

        mesh.position.set(
          square_size * 1,
          -1 * (square_size / 2) * numOfMapLayers +
            (height * (square_size / 2) * (numOfMapLayers - 1)) / 3000 +
            i -
            square_size / numOfMapLayers,
          0
        )

        mesh.name = `last_mesh-${key}`
        scene.add(mesh)
      }
      // )

      // const canvas = makeLabelCanvas(size, name)

      // const texture = new THREE.CanvasTexture(canvas)
      // texture.minFilter = THREE.LinearFilter
      // texture.wrapS = THREE.ClampToEdgeWrapping
      // texture.wrapT = THREE.ClampToEdgeWrapping

      // const labelMaterial = new THREE.MeshBasicMaterial({
      //   map: texture,
      //   side: THREE.DoubleSide,
      //   transparent: true
      // })

      // const mesh = new THREE.Mesh(labelGeometry, labelMaterial)

      // mesh.position.set(
      //   square_size * 1.25,
      //   -1 * (square_size / 2) * numOfMapLayers +
      //     (height * (square_size / 2) * (numOfMapLayers - 1)) / 3000,
      //   0
      // )
      // mesh.name = 'last_mesh'
      // scene.add(mesh)
    })
  })
