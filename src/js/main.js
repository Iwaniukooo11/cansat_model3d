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

const spinner = document.querySelector('.spinner')
console.log(spinner)

scene.add(light)
cubes.forEach(el => scene.add(el))
skeleton.forEach(el => scene.add(el))
// scene.add(line)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight * 0.85)
document.getElementById('canvas-three').append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
controls.enableKeys = true
controls.target = new THREE.Vector3(-1, -2 * numOfMapLayers, -1)
// controls.autoRotate = true;
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
const ctx_charts = [...document.querySelectorAll('.canvas-chart')]
const getCharts = async () => {
  const arr_chart = await charts_promise

  arr_chart.forEach((el, i) => {
    const myChart = new Chart(ctx_charts[i], el)
  })
}
getCharts()

console.log('after_create', Date.now() - start)
window.onload = () => {
  spinner.classList.add('active')
  document.body.classList.add('active')
  console.log('END', Date.now() - start)
}
