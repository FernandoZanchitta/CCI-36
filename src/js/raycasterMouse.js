import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';
import '../../src/style.css'
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

endPositions1stSolution = {
  square: {x: -10.851337908912921, z: -33.82707571606949, rotation: 0},
  parallelogram: {x: -20.585097395913305, z: -24.062714629232534, rotation: 0},
  triangleL1: {x: 3.091721447379814, z:  0.24248795665735434, rotation: 0.75 * Math.PI},
  triangleL2: {x: -0.9675626370954572, z: 13.992444290310656, rotation: 0.75 * Math.PI},
  triangleM1: {x: -1.151817794820150, z: 0.12124397840217505, rotation: 0.5 * Math.PI}, // on right
  triangleS1: {x: -8.001239861870705, z: -21.08263201700317, rotation: 1.75 * Math.PI},
  triangleS2: {x: -22.00578286706513, z: -7.032150998845271, rotation: 0.25 * Math.PI}
}

endPositions2ndSolution = {
  square: {x: -10.851337908912921, z: -33.82707571606949, rotation: 0},
  parallelogram: {x: -20.585097395913305, z: -24.062714629232534, rotation: 0},
  triangleL1: {x: 3.091721447379814, z:  0.24248795665735434, rotation: 0.75 * Math.PI},
  triangleL2: {x: -0.9675626370954572, z: 13.992444290310656, rotation: 0.75 * Math.PI},
  triangleM1: {x: -0.8487078488148475, z: 0.12124397840217505, rotation: Math.PI}, // on left
  triangleS1: {x: 20.126501134616035, z: -7.0621509988452675, rotation: 1.25 * Math.PI},
  triangleS2: {x: 5.94095557197085, z: -21.09645448007031, rotation: 1.75 * Math.PI}
}

endPositions3rdSolution = {
  square: {x: -10.851337908912921, z: -33.82707571606949, rotation: 0},
  parallelogram: {x: -20.585097395913305, z: -24.062714629232534, rotation: 0},
  triangleL1: {x: 3.091721447379814, z:  0.24248795665735434, rotation: 0.75 * Math.PI},
  triangleL2: {x: -1.0305739619858068, z: -28.128606962450213, rotation: 1.75 * Math.PI},
  triangleM1: {x: -0.9699518960134492, z:  -14.064302492202017, rotation: 0},
  triangleS1: {x:  -8.00210229803104, z:   7.03215050433382, rotation: 0.75 * Math.PI},
  triangleS2: {x:  -22.066404858434446, z: -6.910907011917052, rotation: 0.25 * Math.PI}
}

endPositions4thSolution = {
  square: {x: -10.851337908912921, z: -33.82707571606949, rotation: 0},
  parallelogram: {x: -20.585097395913305, z: -24.062714629232534, rotation: 0},
  triangleL1: {x: 3.091721447379814, z:  0.24248795665735434, rotation: 0.75 * Math.PI},
  triangleL2: {x: -1.0305739619858068, z: -28.128606962450213, rotation: 1.75 * Math.PI},
  triangleM1: {x: -0.8487079084972664, z:  -13.94305849674777, rotation: 1.5 *Math.PI},
  triangleS1: {x:  6.362198706954534, z:  7.153394474209915, rotation: 0.75 * Math.PI},
  triangleS2: {x:  19.915110778889968, z: -7.1, rotation: 1.25 * Math.PI}
}
function comparePositions(target, currentPos, currentRotation){
  // console.log(`X difference ${Math.abs(target.x- currentPos.x)}` );
  // console.log(`Z difference ${Math.abs(target.z-currentPos.z)}` );
  // console.log(`Angle difference ${Math.abs((target.rotation - currentRotation)/(2*Math.PI))}` );
  return (Math.abs(target.x- currentPos.x) <= 0.5 && Math.abs(target.z-currentPos.z) <= 0.5 && Math.abs((target.rotation - currentRotation)/(2*Math.PI)) <= 0.25)
}
function verifyStopCondition() {
  solutions = [endPositions1stSolution, endPositions2ndSolution, endPositions3rdSolution, endPositions4thSolution]
  for (let i = 0; i < solutions.length; i++) {
    // console.log("Validando SQUARE");
    squareMatchCondition = comparePositions(solutions[i].square, square.position, square.rotation.y)
    // console.log("Validando TriangleL1 e triangleL2");
    triangleLMatchCondition = ((comparePositions(solutions[i].triangleL2, triangleL1.position, triangleL1.rotation.y) && comparePositions(solutions[i].triangleL1, triangleL2.position, triangleL2.rotation.y)) || (comparePositions(solutions[i].triangleL1, triangleL1.position, triangleL1.rotation.y) && comparePositions(solutions[i].triangleL2, triangleL2.position, triangleL2.rotation.y)))
    // console.log("Validando TRIANGLEM1");
    triangleM1MatchCondition = comparePositions(solutions[i].triangleM1, triangleM1.position, triangleM1.rotation.y)
    // console.log("---------Validando TRIANGLES----------");
    triangleSMatchCondition = ((comparePositions(solutions[i].triangleS2, triangleS1.position, triangleS1.rotation.y) && comparePositions(solutions[i].triangleS1, triangleS2.position, triangleS2.rotation.y)) || (comparePositions(solutions[i].triangleS1, triangleS1.position, triangleS1.rotation.y) && comparePositions(solutions[i].triangleS2, triangleS2.position, triangleS2.rotation.y))) 
    // console.log("Validando PARALELOGRAM");
    parallelogramMatchCondition = comparePositions(solutions[i].parallelogram, parallelogram.position, parallelogram.rotation.y)
    // console.log(squareMatchCondition, triangleLMatchCondition, triangleM1MatchCondition, triangleSMatchCondition, parallelogramMatchCondition)
    if(squareMatchCondition && triangleLMatchCondition && triangleM1MatchCondition && triangleSMatchCondition && parallelogramMatchCondition) {
      // console.log("Solution Found")
      return true
    }
    // if(squareMatchCondition && triangleLMatchCondition && triangleM1MatchCondition && triangleSMatchCondition && parallelogramMatchCondition) {
    //   return true;
    // }
  }
  // return true; // test case
  return false;
}

let hasEnded = false
window.addEventListener('click', event => {
  if (draggable != null) {
    // console.log(draggable.position)
    hasEnded = verifyStopCondition()
    // console.log(hasEnded)
    if (hasEnded == true){
      // console.log("You won!")
      let divBody = document.getElementById("successContainer")
      let successHtml = document.createElement("div")
      let h1Html = document.createElement("h1")
      let button = document.createElement("button")
      button.onclick = () => window.location.reload()
      divBody.appendChild(successHtml)
      successHtml.appendChild(h1Html)
      successHtml.appendChild(button)
      successHtml.setAttribute("id", "containerMessage")
      button.textContent = "Reiniciar Jogo"
      h1Html.textContent = "Parab??ns, voc?? concluiu o jogo!"
    }
    // console.log(`dropping draggable ${draggable.userData.name}`)
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
          // console.log(`found draggable 1: ${draggable.userData.name}`)
        }
    if (found[0].object.userData.draggable) {
      draggable = found[0].object
      // console.log(`found draggable 0: ${draggable.userData.name}`)
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

const floor = createFloor(scene)
createTemplate(scene);

const square = createSquare(scene);
const triangleL1 = createTriangle(scene, { x: 20, y: 1, z: 20}, { x: -30, y: 1 / 2, z: 25 }, 0x6FA8DC,'TRIANGLEL1',  Math.PI/4 );
const triangleL2 = createTriangle(scene, { x: 20, y: 1, z: 20}, { x: -1.8, y: 1 / 2, z: 53.5 },  0x674EA7, 'TRIANGLEL2', 3*Math.PI/4)
const triangleM1 = createTriangle(scene, { x: 10*Math.sqrt(2), y: 1, z: 10*Math.sqrt(2) },{ x: -1, y: 1 / 2, z: 25 },  0xDC143C, 'TRIANGLEM1', Math.PI/2)
const triangleS1 = createTriangle(scene,{ x: 10, y: 1, z: 10}, { x: 19.5, y: 1/ 2, z: 32.5 },0xDC143C,'TRIANGLES1', 5*Math.PI/4)
const triangleS2 = createTriangle(scene,{ x: 10, y: 1, z: 10}, { x: -1.5, y: 1 / 2, z: 10.5 }, 0xBF9000, 'TRIANGLES2', 7*Math.PI/4)
const parallelogram = createParallegram(scene);

const gui = new dat.GUI();


gui.add(triangleL1.rotation,'y',0,2*Math.PI).name('Triangulo L1');
gui.add(triangleL2.rotation,'y',0,2*Math.PI).name('Triangulo L2');
gui.add(triangleM1.rotation,'y',0,2*Math.PI).name('Triangulo M');
gui.add(triangleS1.rotation,'y',0,2*Math.PI).name('Triangulo S1');
gui.add(triangleS2.rotation,'y',0,2*Math.PI).name('Triangulo S2');
gui.add(square.rotation,'y',-Math.PI/4,Math.PI/4).name('Quadrado');
gui.add(parallelogram.rotation,'y',-Math.PI/2,Math.PI/2).name('Paralelogramo');


function animate() {
  // triangleL1.rotation.z += options.angleTriangleLarge1 * 2* Math.PI;
  dragObject();
  renderer.render(scene, camera);
  if (hasEnded == true) {
    floor.material.color.setHex(0x00502c)
  }
  requestAnimationFrame(animate);
}

animate()