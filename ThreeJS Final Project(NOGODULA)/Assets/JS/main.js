import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';


//Creating the Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

// Texture Assets
const grass = new THREE.TextureLoader().load('./Assets/Textures/darkgrass.jpg');
const haunteddoor = new THREE.TextureLoader().load('./Assets/Textures/door.jpg');
const hauntedwall = new THREE.TextureLoader().load('./Assets/Textures/woodwall.jpg');
const hauntedroof = new THREE.TextureLoader().load('./Assets/Textures/roof.jpg');
const hauntedgrave= new THREE.TextureLoader().load('./Assets/Textures/grave.png');
const hauntedbush= new THREE.TextureLoader().load('./Assets/Textures/bush.png');

//Lights Scene
function lighting() {
    const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
    scene.add(light);
  
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 200, 40);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);
  }
  
  lighting();

//Geometry
const plaingeometry = new THREE.BoxGeometry( 20, 0.1, 20 );
const plainmaterial = new THREE.MeshBasicMaterial( { map: grass } );
const plain = new THREE.Mesh( plaingeometry, plainmaterial );
scene.add( plain );


// House container
const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ map: hauntedwall })
)
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ map: hauntedroof  })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

// Door
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2),
  new THREE.MeshStandardMaterial({ map: haunteddoor })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ map: hauntedbush })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ map: hauntedgrave })

for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, 0.3, z)                              

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
}

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

// Fog Scene
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

// Scene Color
renderer.setClearColor('#262837')

//Sphere





















//Camera
camera.position.x= 5;
camera.position.y = 5;
camera.position.z = 5;

//animate
function animate() {
    controls.update();
	requestAnimationFrame( animate );

  renderer.render( scene, camera );
}
animate();