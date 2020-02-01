const THREE = require("three");
const square_size = 2; //also in cube.js

// const image_in_image_data = require("../../../utils/data");
import { image_in_image_data } from "../../../utils/hand-made-data";

// console.log(image_in_image_data);

// const image_in_image_data = [
//   [181, 27, 512],
//   [64, 71, 300],
//   [44, 28, 120],
//   ["last", "last", 50]
// ];

const geometryLine = new THREE.Geometry();
const material_line = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 2
});

for (let i = 0; i < image_in_image_data.length - 1; i++) {
  const x = image_in_image_data[i][0];
  const y = image_in_image_data[i][1];
  const size_curent = image_in_image_data[i][2];
  const size_next = image_in_image_data[i + 1][2];

  geometryLine.vertices.push(
    new THREE.Vector3(
      (square_size * (x + size_next / 2)) / size_curent - square_size / 2,
      -1 * (i + 1),
      (square_size * (y + size_next / 2)) / size_curent - square_size / 2
    )
  );
}

geometryLine.vertices.push(
  new THREE.Vector3(0, -1 * image_in_image_data.length, 0)
);

const line = new THREE.Line(geometryLine, material_line);

export default line;
