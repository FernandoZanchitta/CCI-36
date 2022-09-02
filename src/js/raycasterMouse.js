import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';
import { createTriangle, createFloor, createTemplate, createSquare, createTrianglelarge1, createTrianglelarge2, createTriangleMedium1, createTriangleSmall1, createTriangleSmall2, createParallegram } from './createFigure'

// CAMERA
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(0, 200, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// WINDOW RESIZE HANDLING
export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// SCENE
const scene =  new THREE.Scene()
scene.background = new THREE.Color(0xbfd1e5);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// ambient light
let hemiLight = new THREE.AmbientLight(0xffffff, 0.20);
scene.add(hemiLight);

//Add directional light
let dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-30, 50, -30);
scene.add(dirLight);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.left = -70;
dirLight.shadow.camera.right = 70;
dirLight.shadow.camera.top = 70;
dirLight.shadow.camera.bottom = -70;

const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const moveMouse = new THREE.Vector2();   // create once
var draggable;

function intersect(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObjects(scene.children);
}

window.addEventListener('click', event => {
  if (draggable != null) {
    console.log(`dropping draggable ${draggable.userData.name}`)
    draggable = null;
    return;
  }

  // THREE RAYCASTER
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const found = intersect(clickMouse);
  if (found.length > 0) {
    if(found[0].object.userData.name === "TEMPLATE")
      if(found.length >= 3)
        if (found[1].object.userData.draggable) {
          draggable = found[1].object
          console.log(`found draggable 1: ${draggable.userData.name}`)
        }
    if (found[0].object.userData.draggable) {
      draggable = found[0].object
      console.log(`found draggable 0: ${draggable.userData.name}`)
    }
  }
})

window.addEventListener('mousemove', event => {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function dragObject() {
  if (draggable != null) {
    const found = intersect(moveMouse);
    if (found.length > 0) {
      for (let i = 0; i < found.length; i++) {
        if (!found[i].object.userData.ground)
          continue
        
        let target = found[i].point;
        draggable.position.x = target.x
        draggable.position.z = target.z
      }
    }
  }
}

createFloor(scene)
createTemplate(scene);
// createBox()
const square = createSquare(scene);
// createSphere()
// createCylinder()
const triangleL1 = createTriangle(scene, { x: 20, y: 1, z: 20}, { x: -30, y: 1 / 2, z: 25 }, 0x6FA8DC,'TRIANGLEL1',  Math.PI/4 );
const triangleL2 = createTriangle(scene, { x: 20, y: 1, z: 20}, { x: -1.8, y: 1 / 2, z: 53.5 },  0x674EA7, 'TRIANGLEL2', 3*Math.PI/4)
const triangleM1 = createTriangle(scene, { x: 10*Math.sqrt(2), y: 1, z: 10*Math.sqrt(2) },{ x: -1, y: 1 / 2, z: 25 },  0xDC143C, 'TRIANGLEM1', Math.PI/2)
const triangleS1 = createTriangle(scene,{ x: 10, y: 1, z: 10}, { x: 19.5, y: 1/ 2, z: 32.5 },0xDC143C,'TRIANGLES1', 5*Math.PI/4)
const triangleS2 = createTriangle(scene,{ x: 10, y: 1, z: 10}, { x: -1.5, y: 1 / 2, z: 10.5 }, 0xBF9000, 'TRIANGLES2', -Math.PI/4)
const parallelogram = createParallegram(scene);

const gui = new dat.GUI();


gui.add(triangleL1.rotation,'x',0,2*Math.PI).name('Triangulo L1');
gui.add(triangleL2.rotation,'y',0,2*Math.PI).name('Triangulo L2');
gui.add(triangleM1.rotation,'y',0,2*Math.PI).name('Triangulo M');
gui.add(triangleS1.rotation,'y',0,2*Math.PI).name('Triangulo S1');
gui.add(triangleS2.rotation,'y',0,2*Math.PI).name('Triangulo S2');
gui.add(square.rotation,'y',0,2*Math.PI).name('Quadrado');
gui.add(parallelogram.rotation,'y',0,2*Math.PI).name('Paralelogramo');


function animate() {
  // triangleL1.rotation.z += options.angleTriangleLarge1 * 2* Math.PI;
  dragObject();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate()