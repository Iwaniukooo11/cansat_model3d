const THREE = require("three");
import cansat_data from "../../../utils/cansat-data";

const square_size = 2; //also in line.js
const map_height = 4;

const scene = require("../../environment/scene/scene");
const loader = new THREE.FontLoader();

const material = new THREE.MeshStandardMaterial({
  color: "#fff"
});
const input = document.getElementById("time-input");
// input.max=

let data_to_arr = [];

cansat_data()
  .then(resp => {
    let current_height = resp[0].height;
    let addedData = 0;

    data_to_arr = resp.filter((_, i) => {
      if (addedData >= 15) return false;

      if (i > 2 && i < resp.length - 1) {
        //                                              min 100
        if (current_height - parseInt(resp[i + 1].height) > 200) {
          current_height = resp[i].height;
          addedData++;
          return true;
        }
      }
      return false;
    });
  })
  .then(() => {
    input.max = data_to_arr.length;

    loader.load("../../../assets/fonts/Arial_Regular.typeface.json", font => {
      console.log("here", data_to_arr);
      // here
      // for (let i = 0; i < data_to_arr.length; i++) {
      for (let i = 0; i < 0; i++) {
        const { height, time, pressure } = data_to_arr[i];
        const geometry = new THREE.TextGeometry(
          `height: ${height} preassure: ${pressure} time: ${time}`,
          {
            font: font,
            size: 0.08,
            height: 0
          }
        );

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(square_size * 0.75, -4 + (height * 3) / 3000, 0);

        scene.add(mesh);
      }
    });
  });

const test_data = [];
