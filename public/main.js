
// Import Three.js (si vous utilisez un module moderne)
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
// import { PLYLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/PLYLoader.js';


//import * as THREE from 'three'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Importer OrbitControls
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'

import Stats from 'three/examples/jsm/libs/stats.module.js'

// Création de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Configuration du rendu
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color("lightblue"));

document.body.appendChild(renderer.domElement);

// Création d'une géométrie sphérique
const radius = 1; // Rayon de la sphère
const widthSegments = 32; // Segments horizontaux (plus il y en a, plus c'est précis)
const heightSegments = 32; // Segments verticaux
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

// texture loader
const textureLoader = new THREE.TextureLoader();

const sphereTexture = textureLoader.load(
      'img1.jpg',
      (texture) => {
        console.log("Texture chargée avec succès !");
      },
      undefined,
      (error) => {
        console.error("Erreur lors du chargement de la texture", error);
      }
    );

// Créer un matériau utilisant la texture
const sphereMaterial = new THREE.MeshStandardMaterial({
    map: sphereTexture, // Couleur rouge
});



// Création du maillage (Mesh)
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Ajout de la sphère à la scène
scene.add(sphere);


// Charger le fichier PLY
const loader = new PLYLoader();
loader.load('ant.ply', function (geometry) {
    // Appliquer les matériaux
    geometry.computeVertexNormals(); // Calculer les normales si nécessaire

    //const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

    // texture loader
    const textureLoader = new THREE.TextureLoader();

    const antTexture = textureLoader.load(
        'img1.jpg',
        (texture) => {
            console.log("Texture chargée avec succès !");
        },
        undefined,
        (error) => {
            console.error("Erreur lors du chargement de la texture", error);
        }
    );

    // Créer un matériau utilisant la texture
    const antmaterial = new THREE.MeshStandardMaterial({
        map: antTexture, // Couleur rouge
    });

    const mesh = new THREE.Mesh(geometry, antmaterial);

    // Ajuster la position de l'objet
    mesh.position.set(-2, 0, 0); // Ajustez les valeurs x, y, z selon votre besoin
    // Modifier l'échelle du mesh (ici un facteur d'échelle de 2 pour chaque axe)
    mesh.scale.set(0.07, 0.07, 0.07); // x, y, z

    // Ajouter le mesh à la scène
    scene.add(mesh);
});








// texture loader
const textureLoaderCube = new THREE.TextureLoader();

const cubeTexture = textureLoaderCube.load(
      'img1.jpg',
      (texture) => {
        console.log("Texture chargée avec succès !");
      },
      undefined,
      (error) => {
        console.error("Erreur lors du chargement de la texture", error);
      }
    );

// Créer un matériau utilisant la texture
let material = new THREE.MeshBasicMaterial({
  map: cubeTexture
});

// material dont la couleur depend de la normal
let otherMat = new THREE.MeshNormalMaterial();

let head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), [
    // otherMat,
    // otherMat, 
    // otherMat, 
    // otherMat, 
    // otherMat, 
    // otherMat, 
    material,
    material,
    material,
    material,
    material,
    material,
]);

// set position of head before adding to parent object
head.position.set(2, 0, 0);

// https://threejs.org/docs/index.html#api/en/objects/Group
var group = new THREE.Group();
group.add(head);

// add group to scene
scene.add(group);


// Ajout d'une lumière pour illuminer la sphère
const light = new THREE.PointLight(0xffffff, 1, 100); // Couleur blanche, intensité 1
light.position.set(3, 3, 3); // Position de la lumière
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Lumière faible (intensité 0.2)
scene.add(ambientLight);


// Position de la caméra
camera.position.z = 5;


// Ajouter les OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

const stats = new Stats()
document.body.appendChild(stats.dom)

// Animation pour le rendu
function animate() {
  requestAnimationFrame(animate);

  // Rotation de la sphère pour l'animation
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);

  stats.update()
}

// Lancer l'animation
animate();
