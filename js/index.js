
import * as THREE from "three";     
import * as dat from "dat.gui";
import AxisGridHelper from "./AxisGridHelper";

let camera, scene, renderer;
let geometry, material, sunMesh;
let container = document.getElementById("container");
var gui = new dat.GUI();
// an array of objects whose rotation to update
const objects = [];
 
// use just one sphere for everything
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const color = 0xFFFFFF;
const intensity = 3;
const fov = 40;
const aspect =    container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 1000;

window.addEventListener("resize", function() {
    resize()
})

init();

function init() {
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 0.01, 1000 );
	// camera.position.z = 1;
    scene = new THREE.Scene();

    //create solar system 
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    //add sun 
    const sphereGeometry = new THREE.SphereBufferGeometry(
    radius, widthSegments, heightSegments);
    const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    const light = new THREE.PointLight(color, intensity);
    sunMesh.scale.set(5, 5, 5);  // make the sun large
    solarSystem.add(sunMesh,light);
    objects.push(sunMesh);
    
    // add earth
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.position.x = 10;
    solarSystem.add(earthMesh);
    objects.push(earthMesh);
    
    //add moon
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 3;
    earthOrbit.add(moonOrbit);
    
    const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( container.clientWidth, container.clientHeight );
	renderer.setAnimationLoop( animation );
    container.appendChild( renderer.domElement );
    // renderer.render( scene, camera );

    
  makeAxisGrid(solarSystem, 'solarSystem', 26);
  makeAxisGrid(sunMesh, 'sunMesh');
  makeAxisGrid(earthOrbit, 'earthOrbit');
  makeAxisGrid(earthMesh, 'earthMesh');
  makeAxisGrid(moonOrbit, 'moonOrbit');
  makeAxisGrid(moonMesh, 'moonMesh');
  
}

function animation( time ) {

    objects.forEach((obj) => {
      obj.rotation.y = time/1000;
    });
      renderer.render(scene, camera);

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

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
  }
