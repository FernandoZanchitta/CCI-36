import * as THREE from 'three'
import { BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// CAMERA
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(-35, 70, 100);
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

export function animate() {
  dragObject();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

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
function createBox2() {
    let scale = { x: 10, y: 10, z: 1 }
    let pos = { x: 10, y: scale.y / 2, z: 15 }
  
    let box = new THREE.Mesh(new THREE.PlaneGeometry(), 
        new THREE.MeshPhongMaterial({ color: 073763 }));
    box.rotation.x = -0.5 * Math.PI;
    box.position.set(pos.x, pos.y, pos.z);
    box.position.y -= scale.y/2 -1/2;
    box.scale.set(scale.x, scale.y, scale.z);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box)
  
    box.userData.draggable = true
    box.userData.name = 'BOX2'
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

    let triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0x6FA8DC }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
  
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLE1'
  }
  function createTrianglelarge2() {
    let scale = { x: 20, y: 1, z: 20}
    let pos = { x: -30, y: scale.y / 2, z: -10 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    let triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0x674EA7 }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
  
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLE2'
  }

  function createTriangleMedium1() {
    let scale = { x: 10*Math.sqrt(2), y: 1, z: 10*Math.sqrt(2) }
    let pos = { x: -10, y: scale.y / 2, z: 25 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    let triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0xDC143C }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
  
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLE3'
  }

  function createTriangleSmall1() {
    let scale = { x: 10, y: 1, z: 10}
    let pos = { x: -20, y: scale.y / 2, z: -5 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    let triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0xDC143C }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
  
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLE4'
  }

  function createTriangleSmall2() {
    let scale = { x: 10, y: 1, z: 10}
    let pos = { x: -25, y: scale.y / 2, z: -8 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    let triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0xBF9000 }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle)
  
    triangle.userData.draggable = true
    triangle.userData.name = 'TRIANGLE5'
  }
function createSphere() {
  let radius = 4;
  let pos = { x: 15, y: radius, z: -15 };

  let sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 32, 32), 
      new THREE.MeshPhongMaterial({ color: 0x43a1f4 }))
  sphere.position.set(pos.x, pos.y, pos.z)
  sphere.castShadow = true
  sphere.receiveShadow = true
  scene.add(sphere)

  sphere.userData.draggable = true
  sphere.userData.name = 'SPHERE'
}

function createCylinder() {
  let radius = 4;
  let height = 6
  let pos = { x: -15, y: height / 2, z: 15 };

  // threejs
  let cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius, radius, height, 32), new THREE.MeshPhongMaterial({ color: 0x90ee90 }))
  cylinder.position.set(pos.x, pos.y, pos.z)
  cylinder.castShadow = true
  cylinder.receiveShadow = true
  scene.add(cylinder)

  cylinder.userData.draggable = true
  cylinder.userData.name = 'CYLINDER'
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
createBox2()
// createSphere()
// createCylinder()
createTrianglelarge1()
createTrianglelarge2()
createTriangleMedium1()
createTriangleSmall1()
createTriangleSmall2()
animate()