//import Sketch from "./Sketch";


// new Sketch()



//  ██████╗ ██████╗      █████╗ ███████╗    ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔═══██╗██╔══██╗    ██╔══██╗██╔════╝    ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██║   ██║██████╔╝    ███████║███████╗    █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██║   ██║██╔══██╗    ██╔══██║╚════██║    ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ╚██████╔╝██║  ██║    ██║  ██║███████║    ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
//  ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝


// import * as THREE from "three";                                                                                                           
// let camera, scene, renderer;
// let geometry, material, mesh;

// init();

// function init() {

// 	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
// 	camera.position.z = 1;

// 	scene = new THREE.Scene();

// 	geometry = new THREE.PlaneBufferGeometry( 1 , 1);
// 	material = new THREE.MeshNormalMaterial();

// 	mesh = new THREE.Mesh( geometry, material );
// 	scene.add( mesh );
    
//     const container = document.getElementById("container");
//     const renderer = new THREE.WebGLRenderer({
//         antialias : true
//     });
//     container.appendChild( renderer.domElement );
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// 	renderer.setAnimationLoop( animation );
//     // renderer.render( scene, camera );
// }

// function animation( time ) {

// 	mesh.rotation.x = time / 2000;
// 	mesh.rotation.y = time / 1000;

// 	renderer.render( scene, camera );

// }


import * as THREE from "three";     

let camera, scene, renderer;
let geometry, material, mesh;
const container = document.getElementById("container");
const testDiv = document.getElementById("test");

window.addEventListener("resize", function() {
    resize()
})

init();

function init() {
	camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( container.clientWidth, container.clientHeight );
	renderer.setAnimationLoop( animation );
    container.appendChild( renderer.domElement );
    
}

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}

function setUpResize(){
    window.addEventListener("resize", resize())
}

function resize() {
    console.log("resize")
    var box = container.getBoundingClientRect();
    renderer.setSize(box.width, box.height);
    camera.aspect = box.width/box.height
    camera.updateProjectionMatrix()
}
