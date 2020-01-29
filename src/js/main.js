// declaration

const THREE = require("three");
const OrbitControls = require("three-orbitcontrols");

const camera = require("./camera/camera");
const scene = require("./scene/scene");
const light = require("./light/light");

scene.add(light);

const square_size = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enableKeys = true;
// controls.autoRotate = true;
controls.update();

// cubes
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
  scene.add(cube);
  renderer.render(scene, camera);
}

//lines;
//[x,y,size]
const image_in_image_data = [
  [181, 27, 512],
  [64, 71, 300],
  [44, 28, 120],
  ["last", "last", 50]
];

const geometryLine = new THREE.Geometry();
const material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });

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
scene.add(line);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};
animate();
