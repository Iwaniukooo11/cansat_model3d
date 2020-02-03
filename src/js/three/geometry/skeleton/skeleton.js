const THREE = require('three')
import { square_size, numOfMapLayers } from '../../../utils/hand-made-data'

const line_arr = []

const material_line = new THREE.LineBasicMaterial({
  color: 0xaaaaaa,
  linewidth: 2
})

const makeNewLine = (x, y) => {
  const geometryLine = new THREE.Geometry()

  geometryLine.vertices.push(new THREE.Vector3(x, -1 * (square_size / 2), y))
  geometryLine.vertices.push(
    new THREE.Vector3(x, -1 * (square_size / 2) * numOfMapLayers, y)
  )
  line_arr.push(new THREE.Line(geometryLine, material_line))
}

makeNewLine(0 - square_size / 2, 0 - square_size / 2)
makeNewLine(0 - square_size / 2, 0 + square_size / 2)
makeNewLine(0 + square_size / 2, 0 - square_size / 2)
makeNewLine(0 + square_size / 2, 0 + square_size / 2)

export default line_arr
