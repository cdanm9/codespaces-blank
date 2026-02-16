import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


async function initModel(){
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.outputColorSpace=THREE.SRGBColorSpace;

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x000000); // Set background color to black with full opacity
  renderer.setPixelRatio( window.devicePixelRatio );
  // renderer.setAnimationLoop( animate );
  document.body.appendChild( renderer.domElement );

  // 1. Add Ambient Light so the model isn't pitch black in shadows
  // const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
  // scene.add(ambientLight);

  
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(4, 5, 11);
  camera.lookAt(0, 0, 0);

  const groundGeometry = new THREE.PlaneGeometry( 20,20,32,32 );
  groundGeometry.rotateX(-Math.PI/2);
  const groundMaterial = new THREE.MeshStandardMaterial( { color: 0x555555, side:THREE.DoubleSide} );
  const groundMesh = new THREE.Mesh( groundGeometry, groundMaterial );
  scene.add( groundMesh );
  const spotLight = new THREE.SpotLight( 0xffffff, 3000,100,0.2,0.5) ;
  spotLight.position.set(0, 25, 0);
  scene.add( spotLight );
 
   const loader = new GLTFLoader().setPath('public/BoomBox/');
  //  const gltf = await loader.loadAsync('BoomBox.gltf');
  //  const mesh = gltf.scene;
  //  mesh.scale.set(100, 100, 100); 
  //  scene.add( mesh );

   try {
      const gltf = await loader.loadAsync('BoomBox.gltf');
      const mesh = gltf.scene;

      mesh.scale.set(100, 100, 100); 
      
      // FIX FOR CUTOUT: Calculate box and lift it up
      const box = new THREE.Box3().setFromObject(mesh);
      const size = new THREE.Vector3();
      box.getSize(size);
      mesh.position.set(0, size.y / 2.25, 0); // Lift up by half height
      scene.add(mesh);
    } catch (e) {
      console.error(e);
    }
  


  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();
}

initModel()

