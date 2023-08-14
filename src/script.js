import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from 'dat.gui';
import gsap from "gsap"
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js"


const hdrTextureURL = new URL('../img/christmas_photo_studio_07_4k.hdr', import.meta.url)


// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Axis Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Grid Helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//SPHERE
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x9900FF,
    wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-5, 5, 5);
// sphere.castShadow = true;




// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 3;
scene.add(camera);

//GSAP
// const tl = gsap.timeline()
// window.addEventListener("mousedown", function(){
//   tl.to(camera.position, {
//     z:14,
//     duration:1.5,
//     onUpdate:function(){
//       camera.lookAt(0,0,0)
//     }
//   })


//   tl.to(camera.position, {
//     y:14,
//     duration:1.5,
//     onUpdate:function(){
//       camera.lookAt(0,0,0)
//     }
//   })

//   tl.to(camera.position, {
//     x:10,
//     z:10,
//     y:4,
//     duration:1.5,
//     onUpdate:function(){
//       camera.lookAt(0,0,0)
//     }
//   })
// })


//HDRI

const loader = new RGBELoader()
loader.load(hdrTextureURL, function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture
})

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.outputEncoding = THREE.sRGBEncoding;

//DAT.GUI
// const gui = new dat.GUI();

// const options = {
//     sphereColor: '#ffea00'
 
// };

// gui.addColor(options, 'sphereColor').onChange(function(e){
//   sphere.material.color.set(e);
// });

// gui.add(options, 'wireframe').onChange(function(e){
//     mesh.material.wireframe = e;
// });

// gui.add(options, 'speed', 0, 0.1);

// gui.add(options, 'angle', 0, 1);
// gui.add(options, 'penumbra', 0, 1);
// gui.add(options, 'intensity', 0, 1);


// ORBIT CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update(); // Make sure to call this after any change to the controls and camera.position

//Game loop
function animate() {
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
