const THREE = require("three");
const square_size = 2; //also in cube.js

const line_arr = [];

const material_line = new THREE.LineBasicMaterial({
  color: 0xaaaaaa,
  linewidth: 1
});

const makeNewLine = (x, y) => {
  const geometryLine = new THREE.Geometry();

  geometryLine.vertices.push(new THREE.Vector3(x, -1, y));
  geometryLine.vertices.push(new THREE.Vector3(x, -4, y));
  line_arr.push(new THREE.Line(geometryLine, material_line));
};

makeNewLine(0 - square_size / 2, 0 - square_size / 2);
makeNewLine(0 - square_size / 2, 0 + square_size / 2);
makeNewLine(0 + square_size / 2, 0 - square_size / 2);
makeNewLine(0 + square_size / 2, 0 + square_size / 2);

module.exports = line_arr;
