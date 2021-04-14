import * as THREE from "three";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

var camera, scene, renderer;
var controller1, controller2;
let controllerGrip1, controllerGrip2;

let player, destination;

var room;

// var count = 0, amount = 1000;
// var instancedMesh, objects = [];

// var clock = new THREE.Clock();
// let  scene, camera, renderer;
// const clock = new THREE.Clock();

export default function Main() {
    const containerRef = useRef();
    const canvasRef = useRef();
    const vrButtonConRef = useRef();

    useEffect(() => {
        init();
        animate();

    }, []);

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x404040);
        scene.fog = new THREE.Fog(scene.background, 10, 15);

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 20);
        camera.position.set(0, 1.6, 0);

        var color = new THREE.Color(0x505050);
        room = new THREE.GridHelper(20, 40, color, color);
        room.geometry.translate(0, -0.01, 0); // fix z-fighting
        scene.add(room);

        scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        // renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
        renderer.xr.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        vrButtonConRef.current.appendChild(VRButton.createButton(renderer));

        // controllers
        function onSelectStart() {

            this.userData.isSelecting = true;
            console.log(this)

        }

        function onSelectEnd() {

            this.userData.isSelecting = false;
            console.log(this)

            // Test 함수 의 호출을 여기서 ... 
        }

        function onMove() {
            console.log('moved')
        }

        controller1 = renderer.xr.getController(0);
        controller1.addEventListener('selectstart', onSelectStart);
        controller1.addEventListener('selectend', onSelectEnd);
        controller1.addEventListener('select', onMove);

        controller1.addEventListener('squeezeStart', onMove);
        controller1.addEventListener('squeezeEnd', onMove);
        controller1.addEventListener('squeeze', onMove);
        scene.add(controller1);

        controller2 = renderer.xr.getController(1);
        controller2.addEventListener('selectstart', onSelectStart);
        controller2.addEventListener('selectend', onSelectEnd);

        controller2.addEventListener('squeezeStart', onMove);
        controller2.addEventListener('squeezeEnd', onMove);
        controller2.addEventListener('squeeze', onMove);
        scene.add(controller2);



        const controllerModelFactory = new XRControllerModelFactory();

        controllerGrip1 = renderer.xr.getControllerGrip(0);
        controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
        scene.add(controllerGrip1);

        controllerGrip2 = renderer.xr.getControllerGrip(1);
        controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
        scene.add(controllerGrip2);

        //

        window.addEventListener('resize', onWindowResize, false);

        player = new THREE.Mesh(new THREE.SphereBufferGeometry(0.05, 100, 100), new THREE.MeshNormalMaterial());
        player.position.set(0, 0.05, 0);
        // controllerGrip1.add(player)
        controller1.add(player)
        // scene.add(player);

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function handleController(controller) {

        if (controller.userData.isSelecting) {



        }

    }

    //

    function animate() {

        renderer.setAnimationLoop(render);

    }

    function render() {

        handleController(controller1);
        handleController(controller2);

        // var delta = clock.getDelta(); 

        renderer.render(scene, camera);

    }




    return (

        <div ref={containerRef}>
            <canvas ref={canvasRef} />
            <div ref={vrButtonConRef}></div>
        </div>
    )
}






