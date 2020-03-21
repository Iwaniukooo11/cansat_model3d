const THREE = require('three')
import { square_size, numOfMapLayers } from '../../../utils/hand-made-data'
import scene from '../../environment/scene/scene'

const cubes_arr = []

const toggler = document.querySelector('.onoffswitch-switch')
toggler.addEventListener('click', () => {
  toggler.classList.toggle('img-in-img')
  toggler.classList.toggle('segmentation')
  createCubeLayers()
})

const createCubeLayers = () => {
  for (let i = numOfMapLayers; 1 <= i; i--) {
    const objectToRemove = scene.getObjectByName(`cube-${i}`)
    scene.remove(objectToRemove)

    const folder = toggler.classList.contains('img-in-img')
      ? 'img_in_img'
      : 'segmentation'

    const texture = new THREE.TextureLoader().load(
      `assets/images_camera/${folder}/a-${i}.JPG`
    )

    texture.encoding = THREE.sRGBEncoding
    texture.anisotropy = 16

    const materialCube = new THREE.MeshStandardMaterial({
      color: '#fff',
      map: texture,
      opacity: 0.9999,
      emissive: 'rgb(255,255,255)',
      emissiveIntensity: 0.2,
      transparent: true
    })

    const geometryCube = new THREE.BoxGeometry(square_size, 0.05, square_size)

    const geometryEdge = new THREE.EdgesGeometry(geometryCube)
    const materialEdge = new THREE.LineBasicMaterial({
      color: 0x4c4d4d,
      linewidth: 3
    })
    const wireframe = new THREE.LineSegments(geometryEdge, materialEdge)
    wireframe.renderOrder = 1

    const cube = new THREE.Mesh(geometryCube, materialCube)
    cube.add(wireframe)

    cube.position.set(0, -1 * (square_size / 2) * i, 0) //!!
    cube.name = `cube-${i}`
    scene.add(cube)
  }
}
createCubeLayers()

export default cubes_arr
