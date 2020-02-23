let start = Date.now()

const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

import camera from './three/environment/camera/camera'
import scene from './three/environment/scene/scene'
import light from './three/environment/light/light'

import cubes from './three/geometry/cube/cube'
import line from './three/geometry/line/line'
import skeleton from './three/geometry/skeleton/skeleton'
import text from './three/geometry/text/text'
import { numOfMapLayers } from './utils/hand-made-data'
// import rotate from './three/rotate/index'

const spinner = document.querySelector('.spinner')

scene.add(light)
// cubes.forEach(el => scene.add(el))
skeleton.forEach(el => scene.add(el))

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight * 0.85)
document.getElementById('canvas-three').append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
controls.enableKeys = true
controls.target = new THREE.Vector3(-1, -2 * numOfMapLayers, -1)
// controls.autoRotate = true
controls.update()

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
}
animate()

//chart.js
const Chart = require('chart.js')

import charts_promise from './chart/charts/charts'
import vertical_line from './chart/plugins/vertical-line'
let arr_chart = []

const ctx_charts_up = [...document.querySelectorAll('.canvas-chart-up')]
const ctx_charts_down = [...document.querySelectorAll('.canvas-chart-down')]
const getCharts = async () => {
  // const arr_chart = await charts_promise
  arr_chart = await charts_promise

  arr_chart[0].forEach((el, i) => {
    const myChart = new Chart(ctx_charts_up[i], el)
  })
  arr_chart[1].forEach((el, i) => {
    const myChart = new Chart(ctx_charts_down[i], {
      ...el
      // lineAtIndex: [e.target.value - 1]
    })
  })
}
getCharts()

window.onload = () => {
  spinner.classList.add('active')
  document.body.classList.add('active')
}
const input = document.querySelector('.range-input')
input.addEventListener('input', e => {
  //   //coppied from cube.js
  //   const z=(height * (square_size / 2) * (numOfMapLayers - 1)) /
  //   data_to_arr[0].height +
  // i -
  // square_size / numOfMapLayers,

  arr_chart[0].forEach((el, i) => {
    const myChart = new Chart(ctx_charts_up[i], {
      ...el,
      lineAtIndex: [e.target.value - 1]
    })
  })
})
