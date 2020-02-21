const THREE = require('three')
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const icon_loader = new GLTFLoader()

import camera from './assets/camera'
import scene from './assets/scene'
import light from './assets/light'
const input = document.querySelector('#time-input')
const label = document.querySelector('.rotate-label')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth / 6, window.innerHeight / 6)
document.getElementById('rotate-three').append(renderer.domElement)

let icon_model = ''

input.addEventListener('input', e => {
  //test:
  if (icon_model) {
    const x = e.target.value
    const y = e.target.value * 2
    const z = e.target.value * 3

    icon_model.rotation.x = x
    icon_model.rotation.y = y
    icon_model.rotation.z = z

    label.textContent = `rotate| x:${x} y:${y} z:${z}`
  }
})

icon_loader.load(
  '../../../assets/3d/cansat_icon.glb',
  resp => {
    // const icon = resp.scene
    const icon = resp.scene
    icon.scale.set(0.005, 0.005, 0.005)
    callback_function(icon)
  },
  null,
  err => {
    icon_loader.load('assets/3d/cansat_icon.glb', resp => {
      const icon = resp.scene
      icon.scale.set(0.005, 0.005, 0.005)
      callback_function(icon)
    })
  }
)

const callback_function = icon => {
  icon.scale.set(0.005, 0.005, 0.005)
  icon_model = icon
  scene.add(icon_model)
}

scene.add(light)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  // controls.update()
}
animate()
