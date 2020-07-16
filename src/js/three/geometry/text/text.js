const THREE = require('three')
import { data_cansat } from '../../../utils/cansat-data'
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
  ctx.fillText(`${name}`, borderSize, borderSize)

  return ctx.canvas
}

data_cansat('both')
  .then((resp) => {
    data_to_arr = [...resp]
    console.log('I AM RESPONSE: ', resp, resp.length)
  })
  .then(() => {
    loader.load('../../../assets/fonts/Arial_Regular.typeface.json', (font) => {
      my_font = font
    })
  })
  .then(() => {
    input.max = data_to_arr.length
    input.value = 0

    input.addEventListener('input', (e) => {
      span.textContent = `${e.target.value}s`
      const objectToRemove = scene.getObjectByName('last_mesh')
      scene.remove(objectToRemove)

      const { height, time1, pressure } = data_to_arr[e.target.value * 1 - 1]
      const height_absolute = (
        height * 1 -
        data_to_arr[data_to_arr.length - 1].height * 1
      ).toFixed(2)

      const name = [
        { pressure: pressure, unit: 'hPa' },
        { time: time1, unit: 's' },
        { height: height_absolute, unit: 'm' },
      ]
      const size = 12

      let i = -1
      const arr_canvas = []
      for (const el of name) {
        const key = Object.keys(el)[0]
        const content = `${key}: ${el[key]} ${el['unit']}`

        i++
        const labelGeometry = new THREE.PlaneBufferGeometry(
          parseInt(content.length / 4) + 1,
          1
        )

        const objectToRemove = scene.getObjectByName(`last_mesh-${key}`)
        scene.remove(objectToRemove)

        const canvas = makeLabelCanvas(size, content)

        const texture = new THREE.CanvasTexture(canvas)
        texture.minFilter = THREE.LinearFilter
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping

        const labelMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
        })

        arr_canvas.push(canvas)

        const mesh = new THREE.Mesh(labelGeometry, labelMaterial)

        mesh.position.set(
          square_size * 1,
          -1 * (square_size / 2) * numOfMapLayers +
            (height * (square_size / 2) * (numOfMapLayers - 1)) /
              data_to_arr[0].height +
            i -
            square_size / numOfMapLayers,
          0
        )

        console.log(
          'TEXT POSITION: ',
          -1 * (square_size / 2) * numOfMapLayers +
            (height * (square_size / 2) * (numOfMapLayers - 1)) /
              data_to_arr[0].height +
            i -
            square_size / numOfMapLayers
        )
        mesh.name = `last_mesh-${key}`
        scene.add(mesh)
      }
    })
  })
