import * as THREE from 'three'
import { BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as dat from 'dat.gui';

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

function createFloor() {
  let pos = { x: 0, y: -1, z: 3 };
  let scale = { x: 100, y: 2, z: 100 };

  let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(),
       new THREE.MeshPhongMaterial({ color: 0xf9c834 }));
  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);
  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;
  scene.add(blockPlane);

  blockPlane.userData.ground = true
}

// box
function createBox() {
  let scale = { x: 6, y: 2, z: 6 }
  let pos = { x: 30, y: scale.y / 2, z: 15 }

  let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), 
      new THREE.MeshPhongMaterial({ color: 0xFF763C }));
  box.position.set(pos.x, pos.y, pos.z);
  box.scale.set(scale.x, scale.y, scale.z);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box)

  box.userData.draggable = true
  box.userData.name = 'BOX'
}
function createSquare() {
  let scale = { x: 10, y: 1, z: 10}
    let pos = { x: -1.7, y: scale.y / 2, z: 25 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 0, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    vertices.push( 1, 0, 1 );
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 0 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const parallelogram = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0x33ff66 }));
    parallelogram.position.set(pos.x, pos.y, pos.z);
    parallelogram.scale.set(scale.x, scale.y, scale.z);
    parallelogram.castShadow = true;
    parallelogram.receiveShadow = true;
    scene.add(parallelogram)
    parallelogram.rotation.y = Math.PI/4;
    parallelogram.userData.draggable = true
    parallelogram.userData.name = 'SQUARE'
    return parallelogram;
  }

  function createTrianglelarge1() {
    let scale = { x: 20, y: 1, z: 20}
    let pos = { x: -30, y: scale.y / 2, z: 25 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0x6FA8DC }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle);
    triangle.rotation.y = Math.PI/4;
    triangle.userData.draggable = true;
    triangle.userData.name = 'TRIANGLEL1';
    return triangle;
  }
  function createTrianglelarge2() {
    let scale = { x: 20, y: 1, z: 20}
    let pos = { x: -1.8, y: scale.y / 2, z: 53.5 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0x674EA7 }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
  
    triangle.userData.draggable = true;
    triangle.rotation.y = 3*Math.PI/4;
    triangle.userData.name = 'TRIANGLE2'
    return triangle;
  }

  function createTriangleMedium1() {
    let scale = { x: 10*Math.sqrt(2), y: 1, z: 10*Math.sqrt(2) }
    let pos = { x: -1, y: scale.y / 2, z: 25 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0xDC143C }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
    triangle.rotation.y = Math.PI/2;
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLEM1'
    return triangle;
  }

  function createTriangleSmall1() {
    let scale = { x: 10, y: 1, z: 10}
    let pos = { x: 19.5, y: scale.y / 2, z: 32.5 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0xDC143C }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
    triangle.rotation.y = 5*Math.PI/4;
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLES1'
    return triangle;
  }

  function createTriangleSmall2() {
    let scale = { x: 10, y: 1, z: 10}
    let pos = { x: -1.5, y: scale.y / 2, z: 10.5 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0xBF9000 }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
    triangle.rotation.y = -Math.PI/4;
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLES2'
    return triangle;
  }
function createParallegram(){
  let scale = { x: 10, y: 1, z: 10}
    let pos = { x: -8.5, y: scale.y / 2, z: 3.5 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    vertices.push( 1, 0, 1 );
    vertices.push( 2, 0, 0 );
    vertices.push( 1, 0, 0 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const parallelogram = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0xF945c0 }));
    parallelogram.position.set(pos.x, pos.y, pos.z);
    parallelogram.scale.set(scale.x, scale.y, scale.z);
    parallelogram.castShadow = true;
    parallelogram.receiveShadow = true;
    scene.add(parallelogram)
    parallelogram.rotation.y = -Math.PI/4;
    parallelogram.userData.draggable = true
    parallelogram.userData.name = 'PARALLELOGRAM'
    return parallelogram;
}



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
    if (found[0].object.userData.draggable) {
      draggable = found[0].object
      console.log(`found draggable ${draggable.userData.name}`)
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

createFloor()
// createBox()
const square = createSquare();
// createSphere()
// createCylinder()
const triangleL1 = createTrianglelarge1();
const triangleL2 = createTrianglelarge2()
const triangleM1 = createTriangleMedium1()
const triangleS1 = createTriangleSmall1()
const triangleS2 = createTriangleSmall2()
const parallelogram = createParallegram();

const gui = new dat.GUI();
// const options = {
//   angleTriangleLarge1: 0.2,
//   angleTriangleLarge2: 0.2,
//   angleTriangleMedium1: 0.2,
//   angleTriangleSmall1: 0.2,
//   : 0.2,
//   angleSquare: 0.2,
//   angleParelelogram: 0.2
// };

gui.add(triangleL1.rotation,'y',0,2*Math.PI).name('angleLarge1');
gui.add(triangleL2.rotation,'y',0,2*Math.PI).name('angleLarge2');
gui.add(triangleM1.rotation,'y',0,2*Math.PI).name('angleMedium1');
gui.add(triangleS1.rotation,'y',0,2*Math.PI).name('angleSmall1');
gui.add(triangleS2.rotation,'y',0,2*Math.PI).name('angleSmall2');
gui.add(square.rotation,'y',0,2*Math.PI).name('angleSquare');
gui.add(parallelogram.rotation,'y',0,2*Math.PI).name('angleParallelogram');


function animate() {
  // triangleL1.rotation.z += options.angleTriangleLarge1 * 2* Math.PI;
  dragObject();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate()