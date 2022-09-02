import * as THREE from 'three'
import {OrbitControls} from
"three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui';

import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);

scene.add(axesHelper);

camera.position.set(0,4,10); // position x y z
// orbit.update();

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({color: 0x00FF00})
);
cube1.position.set(10,10,0);
scene.add(cube1);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({color: 0x00FF00})
);
scene.add(cube2);
cube2.position.set(10,-10,0)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({color: 0x00FF00})
);
scene.add(cube3);
cube3.position.set(-10,-10,0);


const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);

plane.receiveShadow = true;






const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight);



//scene.fog = new THREE.Fog(0xFFFFFF,0,200);
scene.fog = new THREE.FogExp2(0xFFFFFF,0.01);

//renderer.setClearColor(0xFFEA00);

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars);



const gui = new dat.GUI();
const options = {
    wireframe: false,
    angle: 0.2,
    intensity: 1
};


gui.add(options, 'angle', 0, 1);
gui.add(options, 'intensity', 0, 1);
let step = 0;

const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove', function(e){
    mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / this.window.innerHeight) * 2 + 1;

});

const rayCaster = new THREE.Raycaster();



function animate(time){


  rayCaster.setFromCamera(mousePosition,camera);
  const intersects = rayCaster. intersectObjects(scene.children);
  console.log(intersects);




  renderer.render(scene, camera);
}


renderer.setAnimationLoop(animate);
window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

})