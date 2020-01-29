const THREE = require("three");
const square_size = 2; //also in cube.js

const image_in_image_data = [
  [181, 27, 512],
  [64, 71, 300],
  [44, 28, 120],
  ["last", "last", 50]
];

const geometryLine = new THREE.Geometry();
const material_line = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 2
});

for (let i = 0; i < image_in_image_data.length - 1; i++) {
  x = image_in_image_data[i][0];
  y = image_in_image_data[i][1];
  size_curent = image_in_image_data[i][2];
  size_next = image_in_image_data[i + 1][2];

  geometryLine.vertices.push(
    new THREE.Vector3(
      (square_size * (x + size_next / 2)) / size_curent - square_size / 2,
      -1 * (i + 1),
      (square_size * (y + size_next / 2)) / size_curent - square_size / 2
    )
  );

  // geometryLine.vertices.push(new THREE.Vector3(0, -1 * (i + 1), 0));
  // geometryLine.vertices.push(new THREE.Vector3(0.2, -3, 0));
  // const line = new THREE.Line(geometryLine, material);
  // scene.add(line);
}

geometryLine.vertices.push(
  new THREE.Vector3(0, -1 * image_in_image_data.length, 0)
);

const line = new THREE.Line(geometryLine, material_line);

module.exports = line;
