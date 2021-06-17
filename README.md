# three-spatial-controls

![alt text](img/spatial4.gif)

> A WebXR camera control for three.js

[![NPM](https://img.shields.io/npm/v/three-spatial-controls.svg)](https://www.npmjs.com/package/three-spatial-controls) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install three-spatial-controls
```

## Demo

- [basic](https://smarthug.github.io/three-spatial-controls/)

- minimal example: https://codesandbox.io/s/goofy-elion-fltsu?file=/src/App.js

## How To Use

- press Select button (Trigger button) to teleport
- press right/left Squeeze button (Grab button) to increase/decrease teleport distance
- use right or left joystick to decide player's direction after a teleport

## Usage

```jsx
import * as THREE from 'three'
import SpatialControls from 'three-spatial-controls'

let scene, camera, renderer
let spatialControls

function Init() {
  // three.js setup
  scene = new THREE.Scene()
  renderer.xr.enabled = true
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  )

  // this will be the player
  let cameraRig = new THREE.Group()
  scene.add(cameraRig)

  let controller0 = renderer.xr.getController(0)
  let controller1 = renderer.xr.getController(1)

  cameraRig.add(camera)
  cameraRig.add(controller0)
  cameraRig.add(controller1)

  spatialControls = new SpatialControls(
    renderer,
    cameraRig,
    controller0,
    controller1,
    // optional config 
    {
      destMarker: destMarker,             // indicator of teleport destination ,THREE.Object3D
      rightHanded: true,                  // righthanded or lefthanded
      playerHandHelper: playerHandHelper, // helper obj for player hand, THREE.Object3D
      destHandHelper: destHandHelper,     // helper obj for destination hand, THREE.Object3D
      multiplyScalar: 1                   // teleport distance
    }
  )
}

function Animate() {
  spatialControls.update()

  renderer.render(scene, camera)
}
```

## License

MIT © [smarthug](https://github.com/smarthug)
