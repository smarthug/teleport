import * as THREE from "three";
import React, { useEffect, useRef } from "react";

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

var camera, scene, renderer;
var controller1, controller2;
let controllerGrip1, controllerGrip2;

var room;

var count = 0, amount = 1000;
var instancedMesh, objects = [];

// var clock = new THREE.Clock();
// let  scene, camera, renderer;
const clock = new THREE.Clock();

export default function Main() {
    const containerRef = useRef();
    useEffect(() => {
        init();
        animate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        // mone

        var geometry = new THREE.PlaneBufferGeometry(0.2, 0.09);
        geometry.rotateZ(Math.PI / 2);
        geometry.rotateX(- Math.PI / 2);

        var loader = new THREE.TextureLoader();
        // var texture = loader.load('https://cdn.glitch.com/cf086db5-7af7-4f20-8220-93d1d99150b7%2F100_dollar_bill_vector.png?1558543607686');
        var texture = loader.load('textures/bill2.png');
        var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

        instancedMesh = new THREE.InstancedMesh(geometry, material, amount);
        instancedMesh.frustumCulled = false;
        room.add(instancedMesh);

        for (var i = 0; i < amount; i++) {

            var object = new THREE.Object3D();

            object.position.x = random() * 8;
            object.position.y = Math.random() * 6;
            object.position.z = random() * 8;
            object.rotation.y = random() * Math.PI * 2;

            object.userData.velocity = new THREE.Vector3();
            object.userData.velocity.x = random() * 0.01;
            object.userData.velocity.y = random() * 0.01;

            object.userData.velocity.z = random() * 0.01;

            object.userData.noise = random() * 0.1;

            objects.push(object);

        }



        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.xr.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        document.body.appendChild(VRButton.createButton(renderer));

        // controllers

        function onSelectStart() {

            this.userData.isSelecting = true;

        }

        function onSelectEnd() {

            this.userData.isSelecting = false;

        }

        controller1 = renderer.xr.getController(0);
        controller1.addEventListener('selectstart', onSelectStart);
        controller1.addEventListener('selectend', onSelectEnd);
        scene.add(controller1);

        controller2 = renderer.xr.getController(1);
        controller2.addEventListener('selectstart', onSelectStart);
        controller2.addEventListener('selectend', onSelectEnd);
        scene.add(controller2);

        /*
                // helpers
    
                var geometry = new THREE.BufferGeometry();
                geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
                geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );
    
                var material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } );
    
                controller1.add( new THREE.Line( geometry, material ) );
                controller2.add( new THREE.Line( geometry, material ) );
        */

        // cannons
        // controller 
        // var geometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 0.1, 6);
        // var texture = new THREE.TextureLoader().load('https://cdn.glitch.com/cf086db5-7af7-4f20-8220-93d1d99150b7%2Fdroplet_01.png?1558588643969');
        // var material = new THREE.MeshMatcapMaterial({ matcap: texture, flatShading: true });

        // var group = new THREE.Group();

        // var mesh = new THREE.Mesh(geometry, material.clone());
        // mesh.position.set(0, 0.02, - 0.06);
        // mesh.rotation.set(Math.PI / 2, 0, 0);
        // mesh.scale.set(0.9, 2.5, 0.6);
        // group.add(mesh);

        // var mesh = new THREE.Mesh(geometry, material.clone());
        // mesh.position.set(0, - 0.05, 0);
        // mesh.rotation.set(- Math.PI / 8, 0, 0);
        // mesh.scale.set(0.25, 1.5, 0.25);
        // group.add(mesh);

        // controller1.add(group.clone());
        // controller2.add(group.clone());

        const controllerModelFactory = new XRControllerModelFactory();

        controllerGrip1 = renderer.xr.getControllerGrip(0);
        controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
        scene.add(controllerGrip1);

        controllerGrip2 = renderer.xr.getControllerGrip(1);
        controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
        scene.add(controllerGrip2);

        //

        window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function handleController(controller) {

        if (controller.userData.isSelecting) {

            var object = objects[count++];
            object.position.copy(controller.position);
            object.quaternion.copy(controller.quaternion);

            var velocity = object.userData.velocity;
            velocity.x = random();
            velocity.y = random() + 0.5;
            velocity.z = Math.random() - 9;
            velocity.applyQuaternion(controller.quaternion);

            object.userData.noise = random() * 0.1;

            if (count === objects.length) count = 0;

        }

    }

    //

    function animate() {

        renderer.setAnimationLoop(render);

    }

    function render() {

        handleController(controller1);
        handleController(controller2);

        //

        var delta = clock.getDelta() * 0.6; // slow down simulation

        for (var i = 0; i < objects.length; i++) {

            var object = objects[i];

            var userData = object.userData;
            var velocity = userData.velocity;

            object.position.x += velocity.x * delta;
            object.position.y += velocity.y * delta;
            object.position.z += velocity.z * delta;

            // flatten rotation

            object.rotation.x *= 0.99;
            object.rotation.z *= 0.99;

            // handle floor

            if (object.position.y <= 0) {

                object.position.y = 0;

                velocity.x *= 0.85;
                velocity.y = 0;
                velocity.z *= 0.85;

            }

            var height = object.position.y * 0.1;

            if (height > 0) {

                velocity.x += userData.noise * height;
                velocity.y -= 9.8 * delta;
                velocity.z += userData.noise * height;
                object.rotation.y += userData.noise * height;

            }

            object.updateMatrix();

            instancedMesh.setMatrixAt(i, object.matrix);

        }

        instancedMesh.instanceMatrix.needsUpdate = true;

        renderer.render(scene, camera);

    }

    function random() {
        return Math.random() - 0.5;
    }


    return <div ref={containerRef}></div>;
}
