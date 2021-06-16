import * as THREE from 'three'
import InfiniteGridHelper from "./InfiniteGridHelper"


export function resizer(camera, renderer) {
    // canvasRef.current.width = window.innerWidth;
    // canvasRef.current.height = window.innerHeight;
    // Set the camera's aspect ratio
    // console.log(window.innerWidth);
    
    camera.aspect = window.innerWidth / window.innerHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(window.innerWidth, window.innerHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
}

export function SceneSetUp(scene) {

    const background = new THREE.CubeTextureLoader()
        .setPath("textures/cube/MilkyWay/")
        .load([
            "dark-s_px.jpg",
            "dark-s_nx.jpg",
            "dark-s_py.jpg",
            "dark-s_ny.jpg",
            "dark-s_pz.jpg",
            "dark-s_nz.jpg",
        ]);

    scene.background = background;

    const grid = new InfiniteGridHelper(10, 100);
    scene.add(grid);

    LightSetUp(scene);
}


function LightSetUp(scene) {
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    // White directional light at half intensity shining from the top.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);
    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemiLight);
    const spotLight = new THREE.SpotLight(0xffa95c, 4);
    spotLight.position.set(-50, 350, 50);
    spotLight.castShadow = true;
    // scene.add(spotLight);
}