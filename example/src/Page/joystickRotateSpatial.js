import React, { useEffect, useRef } from "react";

import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";

import { resizer, SceneSetUp } from "../Utils/utils";
import Loader from "../Utils/loader";

import SpatialControls from "../Utils/JoystickSpatialControls";

let scene, camera, renderer
let spatialControls;

export default function Main() {
  const containerRef = useRef();
  const canvasRef = useRef();
  const vrButtonConRef = useRef();

  useEffect(() => {
    Init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function Init() {
    scene = new THREE.Scene();
    SceneSetUp(scene);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
    });
    renderer.xr.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.setFramebufferScaleFactor(2.0);
    renderer.setAnimationLoop(Animate);

    vrButtonConRef.current.appendChild(VRButton.createButton(renderer));

    window.addEventListener("resize", () => resizer(camera, renderer));

    let cameraRig = new THREE.Group();
    cameraRig.position.set(0, 0, 5);
    cameraRig.add(camera);
    scene.add(cameraRig);

    let controller0 = renderer.xr.getController(0);
    cameraRig.add(controller0);

    let controller1 = renderer.xr.getController(1);
    cameraRig.add(controller1);

    const controllerModelFactory = new XRControllerModelFactory();

    let controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(
      controllerModelFactory.createControllerModel(controllerGrip1)
    );
    cameraRig.add(controllerGrip1);

    let controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(
      controllerModelFactory.createControllerModel(controllerGrip2)
    );
    cameraRig.add(controllerGrip2);

    let destMarker = new THREE.Group();
    scene.add(destMarker);

    Loader("model/opaDuck.gltf", destMarker);
    // Loader("model/scene.gltf", destMarker);

    Loader("model/house.gltf", scene, (obj) => {
      obj.scale.set(15, 15, 15);
      obj.position.set(0, 0, -10);
    });

    spatialControls = new SpatialControls(
      renderer,
      cameraRig,
      controller0,
      controller1,
      destMarker,
      true,
    );
  }

  function Animate() {
    spatialControls.update();

    renderer.render(scene, camera);
  }

  return (
    <div
      style={{
        height: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
      ref={containerRef}
    >
      <canvas ref={canvasRef} />
      <div ref={vrButtonConRef}></div>
    </div>
  );
}