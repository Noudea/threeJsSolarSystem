import * as THREE from "three";

export default class Sketch {
    constructor(selector) {
        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.01,
            10
        );
        this.camera.position.z = 2;

        this.scene = new THREE.Scene();

        this.geometry =  new THREE.BoxGeometry( 1, 1, 1 );
        this.material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.container = document.getElementById("container");
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setSize(
            this.container.offsetWidth,
            this.container.offsetHeight
        );
        this.renderer.setAnimationLoop( this.animation );
        // this.renderer.render(this.scene, this.camera);
        
        //use method
        this.setUpResize()
    }

    animation = (time) =>
    {
    this.mesh.rotation.x = time / 2000;
	this.mesh.rotation.y = time / 1000;
	this.renderer.render( this.scene, this.camera );
    }

    setUpResize = () => {
        window.addEventListener("resize", this.resize())
    }

    resize = () => {
        console.log("resize")
        var box = this.container.getBoundingClientRect();
        this.renderer.setSize(box.width, box.height);

        this.camera.aspect = box.width/box.height
        this.camera.updateProjectionMatrix()
    }
    
}


    // setupResize() {
    //     window.addEventListener("resize", this.resize.bind(this))
    // }

    // resize() {
    //     this.width = this.container.offsetWidth;
    //     this.height = this.container.offsetHeight,
    //         this.renderer.SetSize(this.width, this.height);
    //     this.camera.aspect = this.width / this.height;

    //     //image cover
    //     this.imageAspect = 853 / 1280
    //     let a1
    //     let a2
    //     if (this.height / this.width > this.imageAspect) {
    //         a1 = (this.width / this.height) * this.imageAspect
    //         a2 = 1
    //     } else {
    //         a1 = 1
    //         a2 = (this.height / this.width) / this.imageAspect
    //     }
    //     // this.material.uniforms.resolution.value.x = this.width;
    //     // this.material.uniforms.resolution.value.y = this.height;
    //     // this.material.uniforms.resolution.value.z = a1
    //     // this.material.uniforms.resolution.value.w = a2

    //     //optional cover with quad
    //     const dist = this.camera.position.z
    //     const height = 1
    //     this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist))

    //     if (this.width / this.height > 1) {
    //         this.plane.scale.x = this.camera.aspect
    //     } else {
    //         this.plane.scale.y = 1 / this.camera.aspect
    //     }

    //     this.camera.updateProjectionMatrix();

    // }

