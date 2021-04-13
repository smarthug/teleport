import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import { TransformControls } from 'three/examples/jsm/controls/TransformControls'



import CameraControls from "camera-controls";

import * as dat from 'dat.gui';

const controlledObj = {
    multipliedScalar: 3,
    teleport: () => { }

}


CameraControls.install({ THREE: THREE });

let cube, scene, camera, renderer, cameraControls, player, destination, box;
let control
const clock = new THREE.Clock();

let playerPos = new THREE.Vector3();
let destinationPos = new THREE.Vector3();
// let cubePos = new THREE.Vector3();

let result = new THREE.Vector3();

let tmp = new THREE.Vector3();
let tmpQuaternion = new THREE.Quaternion();






function TranslateHelperGeometry() {

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3));

    return geometry;

}


const matHelper = new THREE.MeshBasicMaterial({
    depthTest: false,
    depthWrite: false,
    transparent: true,
    side: THREE.DoubleSide,
    fog: false,
    toneMapped: false
});


let deltaLine = new THREE.Line(TranslateHelperGeometry(), matHelper);

let deltaLine2 = new THREE.Line(TranslateHelperGeometry(), matHelper)


// handle.position.copy( this.worldPositionStart );
// 					handle.quaternion.copy( this.worldQuaternionStart );
// 					_tempVector.set( 1e-10, 1e-10, 1e-10 ).add( this.worldPositionStart ).sub( this.worldPosition ).multiplyScalar( - 1 );
// 					_tempVector.applyQuaternion( this.worldQuaternionStart.clone().invert() );
// 					handle.scale.copy( _tempVector );
// 					handle.visible = this.dragging;

export default function Main() {
    const containerRef = useRef();
    const canvasRef = useRef();
    useEffect(() => {
        Init();
        Animate();

        controlledObj.teleport = Test


        const gui = new dat.GUI();
        gui.open();

        gui.add(controlledObj, "multipliedScalar")
        gui.add(controlledObj, "teleport")

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

            deltaLine.visible = !deltaLine.visible;
            deltaLine2.visible = !deltaLine2.visible;

        });

        control.attach(destination);
        scene.add(control);
        scene.add(camera)

        var geometry2 = new THREE.BoxGeometry(1, 1, 1);
        var material2 = new THREE.MeshNormalMaterial({ wireframe: true });
        box = new THREE.Mesh(geometry2, material2);
        scene.add(box);

        scene.add(deltaLine)
        scene.add(deltaLine2)
    }

    function Animate() {
        requestAnimationFrame(Animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        const delta = clock.getDelta();
        // const hasControlsUpdated = cameraControls.update(delta);
        cameraControls.update(delta);



        if (control.dragging) {

            deltaLine.visible = true;
            deltaLine2.visible = true
            player.getWorldPosition(playerPos)
            destination.getWorldPosition(destinationPos)

            tmp.subVectors(destinationPos, playerPos)

            tmp.multiplyScalar(controlledObj.multipliedScalar);
            box.position.copy(tmp.add(cube.position))

            player.getWorldQuaternion(tmpQuaternion);

            deltaLine.position.copy(playerPos);
            // tmp.set(1e-10, 1e-10, 1e-10).add(playerPos).sub(destinationPos).multiplyScalar(- 1);
            // tmp.set(1e-10, 1e-10, 1e-10).add(playerPos).sub(destinationPos).multiplyScalar(- 1);
            tmp.set(1e-10, 1e-10, 1e-10).add(destinationPos).sub(playerPos);
            ///???? 한번 물어볼까 ????
            deltaLine.scale.copy(tmp);

            deltaLine2.position.copy(cube.position);
            tmp.set(1e-10, 1e-10, 1e-10).add(cube.position).sub(box.position).multiplyScalar(- 1);
            deltaLine2.scale.copy(tmp);
        }


        renderer.render(scene, camera);
    }

    function Test() {
        result = tmp.subVectors(destinationPos, playerPos)
        cube.position.add(result.multiplyScalar(controlledObj.multipliedScalar));
    }



    return (
        <div ref={containerRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
