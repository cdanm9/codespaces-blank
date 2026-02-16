import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


async function initModel(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  // const camera = new THREE.PerspectiveCamera( 150, window.innerWidth / window.innerHeight, 0.1, 7000 );
  // const renderer = new THREE.WebGLRenderer();
  const renderer = new THREE.WebGLRenderer({alpha:true});

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setAnimationLoop( animate );
  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

  const lMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );

  const points = [];
  points.push( new THREE.Vector3( - 2, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 2, 0 ) );
  points.push( new THREE.Vector3( 2, 0, 0 ) );

  const lGeometry = new THREE.BufferGeometry().setFromPoints( points );

  const line = new THREE.Line( lGeometry, lMaterial );

  // const s3DText =new THREE.TextGeometry( "Hello World", {} );


  const cube = new THREE.Mesh( geometry, material );
  // const msg = new THREE.Mesh( s3DText, material );
  scene.add( cube );
  // scene.add( msg );
  scene.add( line );
  camera.position.z = 5;


  // const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  // topLight.position.set(500, 500, 500) //top-left-ish
  // topLight.castShadow = true;
  // scene.add(topLight);

  // const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
  // scene.add(ambientLight);



  function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }



  const loader = new GLTFLoader();
  const gifLoader=await loader.loadAsync( './public')
  scene.add( gifLoader.scene );

}

initModel()

