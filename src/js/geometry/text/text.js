const THREE = require("three");
const square_size = 2; //also in line.js

const scene = require("../../environment/scene/scene");

const loader = new THREE.FontLoader();

const material = new THREE.MeshStandardMaterial({
  color: "#fff"
});

const test_data = [];

loader.load("../../../assets/fonts/Arial_Regular.typeface.json", font => {
  console.log("here");

  for (let i = 0; i < 4; i++) {
    const geometry = new THREE.TextGeometry(
      `temperature: ${Math.round(Math.random() * 10)} preassure:  ${Math.round(
        Math.random() * 10
      )}`,
      {
        font: font,
        size: 0.1,
        height: 0
      }
    );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(square_size * 0.75, -1 * (i + 1), 0);

    scene.add(mesh);
  }
});
