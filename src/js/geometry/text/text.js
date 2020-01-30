const THREE = require("three");
const square_size = 2; //also in line.js
const map_height = 4;

const scene = require("../../environment/scene/scene");

const loader = new THREE.FontLoader();

const material = new THREE.MeshStandardMaterial({
  color: "#fff"
});

const test_data = [];
// for (let i = 0; i < 30; i += 1) {
//   const height = Math.floor(Math.random() * (i * 100 - 50) + 50);

//   const obj = {
//     height: height,
//     time: i,
//     preassure: Math.round(Math.random() * 10, 2)
//   };

//   if (Math.round(Math.random() * 10) !== 3) test_data.push(obj);
// }

loader.load("../../../assets/fonts/Arial_Regular.typeface.json", font => {
  console.log("here");

  for (let i = 0; i < test_data.length; i++) {
    const { height, time, preassure } = test_data[i];
    const geometry = new THREE.TextGeometry(
      `height: ${height} preassure: ${preassure} time: ${time}`,
      {
        font: font,
        size: 0.03,
        height: 0
      }
    );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(square_size * 0.75, -4 + (height * 3.2) / 3000, 0);

    scene.add(mesh);
  }
});
