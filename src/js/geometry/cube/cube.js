const THREE = require("three");
const square_size = 2; //also in line.js

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

module.exports = cubes_arr;
