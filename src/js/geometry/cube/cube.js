const THREE = require("three");
const square_size = 2; //also in line.js

// const geometryLine = new THREE.Geometry();
// const material_line = new THREE.LineBasicMaterial({
//   color: 0x0000ff,
//   linewidth: 2
// });

const cubes_arr = [];

for (let i = 4; 1 <= i; i--) {
  const texture = new THREE.TextureLoader().load(
    `http://192.168.1.15:3000/assets/images_camera/${i}.png`
  );

  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: texture,
    emissive: "rgb(255,255,255)",
    emissiveIntensity: 0.2
    // transparent: true
  });

  // const geometryCube = new THREE.BoxGeometry(2, 0.05, 2);
  const geometryCube = new THREE.BoxGeometry(square_size, 0.05, square_size);
  const cube = new THREE.Mesh(geometryCube, material);
  cube.position.set(0, -1 * i, 0);
  cubes_arr.push(cube);
}

// geometryLine.vertices.push(
//   new THREE.Vector3(0 - square_size / 2, -1, 0 - square_size / 2)
// );
// geometryLine.vertices.push(
//   new THREE.Vector3(0 - square_size / 2, -4, 0 - square_size / 2)
// );

module.exports = cubes_arr;
