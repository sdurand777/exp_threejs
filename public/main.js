
// Import Three.js (si vous utilisez un module moderne)
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
// import { PLYLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/PLYLoader.js';


//import * as THREE from 'three'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importer OrbitControls
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js'

import Stats from 'three/examples/jsm/libs/stats.module.js'

//import { GUI } from 'dat.gui'
import { GUI } from 'lil-gui' // modern gui interface

const dataA = {
  color: 0x00ff00,
  lightColor: 0xffffff,
  shadowMapSizeWidth: 512,
  shadowMapSizeHeight: 512,
}

const gui = new GUI()

// Création de la scène, de la caméra et du rendu
const scene = new THREE.Scene();

scene.background = new THREE.TextureLoader().load("ivm.png")

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer({ antialias: true })

// Configuration du rendu

renderer.shadowMap.type = THREE.PCFShadowMap // (default)
//renderer.shadowMap.type = THREE.PCFSoftShadowMap
//renderer.shadowMap.type = THREE.BasicShadowMap
//renderer.shadowMap.type = THREE.VSMShadowMap
renderer.shadowMap.enabled = true


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



const sceneA = new THREE.Scene()
sceneA.background = new THREE.Color(0x123456)

// Créer un nuage de points aléatoire
const particleCount = 3000; // Nombre de points
const positions = new Float32Array(particleCount * 3); // x, y, z pour chaque point

// Générer des positions aléatoires
for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Position entre -5 et 5
}

// Créer la géométrie et ajouter les positions
const pgeometry = new THREE.BufferGeometry();
pgeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Créer un matériau pour les points
const pmaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Couleur blanche
    size: 0.1, // Taille des points
});

// Créer l'objet Points
const points = new THREE.Points(pgeometry, pmaterial);
sceneA.add(points);


// add ground plane
//const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial())
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
plane.castShadow = true
//plane.visible = false
sceneA.add(plane)

// const ambientLightA = new THREE.AmbientLight(0xffffff, 0.9); // Lumière faible (intensité 0.2)
// sceneA.add(ambientLightA);

const gridHelper = new THREE.GridHelper()
sceneA.add(gridHelper)


const data = { color: 0x00ff00, labelsVisible: true }

const geometry = new THREE.IcosahedronGeometry(1, 1)

const meshes = [
  new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: data.color })),
  new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ flatShading: true })),
  new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: data.color, flatShading: true })),
  new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: data.color, flatShading: true })),
]

meshes[0].position.set(-3, 1, 0)
meshes[1].position.set(-1, 1, 0)
meshes[2].position.set(1, 1, 0)
meshes[3].position.set(3, 1, 0)

meshes[3].scale.set(1.2,1.2,1.2)

meshes[0].castShadow = true
meshes[1].castShadow = true
meshes[2].castShadow = true
meshes[3].castShadow = true
//meshes.map((m) => (m.castShadow = true)) // using array map
meshes.map((m) => (m.receiveShadow = true))

sceneA.add(...meshes)

// // add light
// const lightA = new THREE.DirectionalLight(undefined, Math.PI)
// lightA.position.set(1, 1, 1)
// sceneA.add(lightA)

// #endregion
// #region DirectionalLight

const directionalLight = new THREE.DirectionalLight(dataA.lightColor, Math.PI)
directionalLight.position.set(1, 1, 1)
directionalLight.castShadow = true
directionalLight.shadow.camera.near = 0
directionalLight.shadow.camera.far = 10
directionalLight.shadow.mapSize.width = dataA.shadowMapSizeWidth
directionalLight.shadow.mapSize.height = dataA.shadowMapSizeHeight
sceneA.add(directionalLight)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightHelper.visible = false
sceneA.add(directionalLightHelper)

const directionalLightFolder = gui.addFolder('DirectionalLight')
directionalLightFolder.add(directionalLight, 'visible')
directionalLightFolder.addColor(dataA, 'lightColor').onChange(() => {
    directionalLight.color.set(dataA.lightColor)
})
directionalLightFolder.add(directionalLight, 'intensity', 0, Math.PI * 10)
directionalLightFolder.add(directionalLight.position, 'x', -5, 5, 0.001).onChange(() => {
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLight.position, 'y', -5, 5, 0.001).onChange(() => {
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLight.position, 'z', -5, 5, 0.001).onChange(() => {
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLightHelper, 'visible').name('Helper Visible')
directionalLightFolder.add(directionalLight.shadow.camera, 'left', -10, -1, 0.1).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLight.shadow.camera, 'right', 1, 10, 0.1).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLight.shadow.camera, 'top', 1, 10, 0.1).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLight.shadow.camera, 'bottom', -10, -1, 0.1).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLight.shadow.camera, 'near', 0, 100).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
    directionalLightHelper.update()
})
directionalLightFolder.add(directionalLight.shadow.camera, 'far', 0.1, 100).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
    directionalLightHelper.update()
})
directionalLightFolder.add(dataA, 'shadowMapSizeWidth', [256, 512, 1024, 2048, 4096]).onChange(() => updateDirectionalLightShadowMapSize())
directionalLightFolder.add(dataA, 'shadowMapSizeHeight', [256, 512, 1024, 2048, 4096]).onChange(() => updateDirectionalLightShadowMapSize())
directionalLightFolder.add(directionalLight.shadow, 'radius', 1, 10, 1).name('radius (PCF | VSM)') // PCFShadowMap or VSMShadowMap
directionalLightFolder.add(directionalLight.shadow, 'blurSamples', 1, 20, 1).name('blurSamples (VSM)') // VSMShadowMap only


function updateDirectionalLightShadowMapSize() {
    directionalLight.shadow.mapSize.width = dataA.shadowMapSizeWidth
    directionalLight.shadow.mapSize.height = dataA.shadowMapSizeHeight
    directionalLight.shadow.map = null
}






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

let activeScene = sceneA
const setScene = {
  sceneA: () => {
    activeScene = sceneA
  },
  sceneB: () => {
    activeScene = scene
  },
}

gui.add(setScene, 'sceneA').name('Scene A')
gui.add(setScene, 'sceneB').name('Scene B')



let angle = 0; // Angle initial
// Animation pour le rendu
function animate() {
    requestAnimationFrame(animate);

    // Rotation de la sphère pour l'animation
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    angle += 0.01; // Incrémenter l'angle pour la rotation

    // Rayon de rotation
    const radius = 1;

    // Mettre à jour la position de la lumière
    directionalLight.position.x = Math.cos(angle) * radius;
    directionalLight.position.z = Math.sin(angle) * radius;

    // Si nécessaire, orientez la lumière vers le centre
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.target.updateMatrixWorld();


    renderer.render(activeScene, camera);

    stats.update()
}

// Lancer l'animation
animate();
