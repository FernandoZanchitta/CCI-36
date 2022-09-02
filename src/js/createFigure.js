import * as THREE from 'three'

// floor
export function createFloor(scene) {
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

export function createTemplate(scene){
    let scale = { x: 15, y: 1, z: 15}
    let pos = { x: 13, y: scale.y / 2, z: 0 }
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 2, 0, 0 );
    vertices.push( 0, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 0, 0, 1 );
    vertices.push( -0.3, 0, 1 );
    vertices.push( 0.7, 0, 2 );
    vertices.push( 0.7, 0, 2 );
    vertices.push( 0.9, 0, 1.7 );
    vertices.push( 0, 0, 1 );
    vertices.push( 0, 0, 1 );
    vertices.push( 0.9, 0, 1.7 );
    vertices.push( 2, 0, 1 );
    vertices.push( 2, 0, 1 );
    vertices.push( 0.9, 0, 1.7 );
    vertices.push( 0.9, 0, 2.35 );
    vertices.push( 0.9, 0, 2.35 );
    vertices.push( 1.6, 0, 2.35 );
    vertices.push( 1.6, 0, 1.7 );
    vertices.push( 1.6, 0, 1.7 );
    vertices.push( 2.35, 0, 1 );
    vertices.push( 2, 0, 1 );
    vertices.push( 2, 0, 1 );
    vertices.push( 0.9, 0, 2.35 );
    vertices.push( 1.6, 0, 1.7 );
    vertices.push( 1.6, 0, 1.7 );
    vertices.push( 2.35, 0, 1 );
    vertices.push( 2, 0, 1 );
    vertices.push( 2, 0, 1 );
    vertices.push( 2, 0, 0 );
    vertices.push( 0, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const template = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: 0x031035 }));
    template.position.set(pos.x, pos.y, pos.z);
    template.scale.set(scale.x, scale.y, scale.z);
    template.castShadow = true;
    template.receiveShadow = true;
    scene.add(template)
    template.rotation.y = Math.PI;
    template.userData.draggable = false
    template.userData.name = 'TEMPLATE'
    return template;
}

// box
export function createBox(scene) {
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

// square
export function createSquare(scene) {
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
// triangle
export function createTriangle(scene, scale, pos, color, name, y_rotation) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    vertices.push( 1, 0, 0 );
    vertices.push( 0, 0, 1 );
    vertices.push( 1, 0, 1 );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const triangle = new THREE.Mesh(geometry, 
        new THREE.MeshBasicMaterial({ color: color }));
    triangle.position.set(pos.x, pos.y, pos.z);
    triangle.scale.set(scale.x, scale.y, scale.z);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle);
    triangle.rotation.y = y_rotation;
    triangle.userData.draggable = true;
    triangle.userData.name = name;
    return triangle;
}

// parallelogram
export function createParallegram(scene){
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