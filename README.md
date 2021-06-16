# three-spatial-controls

![alt text](img/test.gif)

> A WebXR camera control for three.js

[![NPM](https://img.shields.io/npm/v/three-spatial-controls.svg)](https://www.npmjs.com/package/three-spatial-controls) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save three-spatial-controls
```

## Demo

- [basic](https://smarthug.github.io/three-spatial-controls/)

## How To Use

- press Select button (Trigger button) to teleport
- press right/left Squeeze button (Grab button) to increase/decrease teleport distance

## Usage

```jsx
import * as THREE from "three";
import SpatialControls from 'three-spatial-controls'

let scene, camera, renderer
let spatialControls;

function Init() {
  // scene setup
    scene = new THREE.Scene();
    ...

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

    spatialControls = new SpatialControls(
      renderer,
      cameraRig, // camera attached object , player
      controller0,
      controller1,
      destMarker, // indicator of teleport destination
      true,
    );
  }

function Animate() {
    spatialControls.update();

    renderer.render(scene, camera);
  }
```

## License

MIT © [smarthug](https://github.com/smarthug)
