import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import { TransformControls } from 'three/examples/jsm/controls/TransformControls'



import CameraControls from "camera-controls";

import * as dat from 'dat.gui';

const controlledObj = {
    multipliedScalar: 3,
    teleport:()=>{}

}
const gui = new dat.GUI();
gui.open();

gui.add(controlledObj, "multipliedScalar")
gui.add(controlledObj, "teleport")

CameraControls.install({ THREE: THREE });

let cube, scene, camera, renderer, cameraControls, player, destination, box;
let control
const clock = new THREE.Clock();

let playerPos = new THREE.Vector3();
let destinationPos = new THREE.Vector3();

let result = new THREE.Vector3();

let tmp = new THREE.Vector3();

export default function Main() {
    const containerRef = useRef();
    const canvasRef = useRef();
    useEffect(() => {
        Init();
        Animate();

        controlledObj.teleport = Test

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color("skyblue")
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // containerRef.current.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshNormalMaterial();
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;

        cameraControls = new CameraControls(camera, renderer.domElement);


        player = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 100, 100), material);
        player.position.set(0, 1, 0);
        scene.add(player);

        // let player =new THREE.Mesh(new THREE.SphereBufferGeometry(1,100,100), material);

        // scene.add(player);


        destination = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 100, 100), material);
        destination.position.set(3, 3, 3);
        scene.add(destination);

        scene.add(new THREE.AxesHelper(10))

        control = new TransformControls(camera, renderer.domElement);

        control.addEventListener('dragging-changed', function (event) {

            cameraControls.enabled = !event.value;

        });

        control.attach(destination);
        scene.add(control);
        scene.add(camera)

        var geometry2 = new THREE.BoxGeometry(1, 1, 1);
        var material2 = new THREE.MeshNormalMaterial({ wireframe: true });
        box = new THREE.Mesh(geometry2, material2);
        scene.add(box);
    }

    function Animate() {
        requestAnimationFrame(Animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        const delta = clock.getDelta();
        // const hasControlsUpdated = cameraControls.update(delta);
        cameraControls.update(delta);



        if (control.dragging) {
            // console.log("dragging")
            player.getWorldPosition(playerPos)
            destination.getWorldPosition(destinationPos)

            tmp.subVectors(destinationPos, playerPos)
          
            tmp.multiplyScalar(controlledObj.multipliedScalar);
            box.position.copy(tmp.add(cube.position))
        }

        renderer.render(scene, camera);
    }

    function Test() {
        console.log("test")
        console.log(player.getWorldPosition(playerPos))
        console.log(destination.getWorldPosition(destinationPos))

       


      

        // let tmp = new THREE.VectorcontrolledObj.multipliedScalar();
        result = tmp.subVectors(destinationPos, playerPos)

        console.log(result);
        // console.log(result.multiplyScalar(controlledObj.multipliedScalar));
        cube.position.add(result.multiplyScalar(controlledObj.multipliedScalar));
        // box.position.add(result)
        camera.position.set(result);
    }

    return <div ref={containerRef}
    ><button onClick={Test} style={{ position: "absolute" }}>TEST</button>
        <canvas ref={canvasRef}></canvas>
    </div>;
}
