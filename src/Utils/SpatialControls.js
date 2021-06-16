import * as THREE from "three";

let tmpQuaternion = new THREE.Quaternion();
let tmpMatrix = new THREE.Matrix4();

let centerVec = new THREE.Vector3(0, 0, 0);
let upVec = new THREE.Vector3(0, 1, 0);

let cameraVec = new THREE.Vector3();
let forwardVec = new THREE.Vector3();
let rightVec = new THREE.Vector3();
let tmpVec = new THREE.Vector3();
let directionVec = new THREE.Vector3();

let tmp = new THREE.Vector3();

const isOculusBrowser = /OculusBrowser/.test(navigator.userAgent);


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




export default class SpatialControls extends THREE.EventDispatcher {
  constructor(
    renderer,
    cameraRig,
    controller0,
    controller1,
    destMarker,
    righthanded = true,
  ) {
    super();

    this._xr = renderer.xr;

    // player
    this._cameraRig = cameraRig;

    this._hander = righthanded ? "right" : "left"

    //a hand that represent player's position
    // 컨트롤러 그자체로 하는가 맞을까 ??
    this._playerHand = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.05, 100, 100),
      new THREE.MeshStandardMaterial({ color: "green" })
    );
    this._playerHand.position.set(0, 0.05, 0);

    //a hand that represent the destination to teleport
    this._destHand = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.05, 100, 100),
      new THREE.MeshStandardMaterial({ color: "yellow" })
    );
    this._destHand.position.set(0, 0.05, 0);

    // each xr controller hand position represent player positon, teleport destination position
    this._playerHandPos = new THREE.Vector3();
    this._destHandPos = new THREE.Vector3();

    //marker to show where to be teleported
    this._destMarker = destMarker;

    this._tmpVector = new THREE.Vector3();
    this._resultVector = new THREE.Vector3();

    // teleport distance multiply scalar
    this._multiplyScalar = 3;

    this._helperLine = new THREE.Line(TranslateHelperGeometry(), matHelper);

    // this._helperLine2 = new THREE.Line(TranslateHelperGeometry(), matHelper)
    this._helperLine2 = this._helperLine.clone();


    // scene.add(this._helperLine)
    // scene.add(this._helperLine2)
    this._cameraRig.parent.add(this._helperLine)
    this._cameraRig.parent.add(this._helperLine2)

    const onSelectEnd = () => {
      this.teleport();
    };

    const onFromSqueezeStart = () => {
      //   this._multiplyScalar--;
      this._multiplyScalar *= 0.5;
    };

    const onToSqueezeStart = () => {
      //   this._multiplyScalar++;
      this._multiplyScalar *= 2;
    };

    controller0.addEventListener("selectend", onSelectEnd);
    controller1.addEventListener("selectend", onSelectEnd);


    if (righthanded) {
      controller0.add(this._destHand);
      controller1.add(this._playerHand);
    } else {
      controller0.add(this._playerHand);
      controller1.add(this._destHand);
    }

    // if (righthanded) {
    //   if (!isOculusBrowser) {
    //     controller0.add(this._destHand);
    //     controller1.add(this._playerHand);
    //     controller0.addEventListener("squeezestart", onToSqueezeStart);
    //     controller1.addEventListener("squeezestart", onFromSqueezeStart);
    //   } else {
    //     controller0.add(this._playerHand);
    //     controller1.add(this._destHand);
    //     controller0.addEventListener("squeezestart", onFromSqueezeStart);
    //     controller1.addEventListener("squeezestart", onToSqueezeStart);
    //   }
    // } else {
    //   if (!isOculusBrowser) {
    //     controller0.add(this._playerHand);
    //     controller1.add(this._destHand);
    //     controller0.addEventListener("squeezestart", onFromSqueezeStart);
    //     controller1.addEventListener("squeezestart", onToSqueezeStart);
    //   } else {
    //     controller0.add(this._destHand);
    //     controller1.add(this._playerHand);
    //     controller0.addEventListener("squeezestart", onToSqueezeStart);
    //     controller1.addEventListener("squeezestart", onFromSqueezeStart);
    //   }
    // }


    if (righthanded === !isOculusBrowser) {
      controller0.add(this._destHand);
      controller1.add(this._playerHand);
      controller0.addEventListener("squeezestart", onToSqueezeStart);
      controller1.addEventListener("squeezestart", onFromSqueezeStart);
    } else {
      controller0.add(this._playerHand);
      controller1.add(this._destHand);
      controller0.addEventListener("squeezestart", onFromSqueezeStart);
      controller1.addEventListener("squeezestart", onToSqueezeStart);
    }

    const loader = new THREE.FontLoader();

    loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
      const geometry = new THREE.TextGeometry("From", {
        font: font,
        size: 0.05,
        height: 0.05,
      });

      this._playerHand.add(
        new THREE.Mesh(geometry, new THREE.MeshNormalMaterial())
      );

      const geometry2 = new THREE.TextGeometry("To", {
        font: font,
        size: 0.05,
        height: 0.05,
      });

      this._destHand.add(
        new THREE.Mesh(geometry2, new THREE.MeshNormalMaterial())
      );
    });


    // tmpMatrix.lookAt(centerVec, tmpVec, upVec);
    tmpMatrix.lookAt(centerVec, new THREE.Vector3(0,0,1), upVec);

    tmpQuaternion.setFromRotationMatrix(tmpMatrix);
    this._destMarker.setRotationFromQuaternion(tmpQuaternion);
  }

  update() {
    this._playerHand.getWorldPosition(this._playerHandPos);
    this._destHand.getWorldPosition(this._destHandPos);

    this._tmpVector.subVectors(this._destHandPos, this._playerHandPos);

    this._tmpVector.multiplyScalar(this._multiplyScalar);
    this._destMarker.position.copy(
      this._tmpVector.add(this._cameraRig.position)
    );

    // controller 정보 가져와서 ... joystick 추출하기 ...

    // player.getWorldQuaternion(tmpQuaternion);

    this._helperLine.position.copy(this._playerHandPos);
    tmp.set(1e-10, 1e-10, 1e-10).add(this._destHandPos).sub(this._playerHandPos);
    this._helperLine.scale.copy(tmp);

    this._helperLine2.position.copy(this._cameraRig.position);
    tmp.set(1e-10, 1e-10, 1e-10).add(this._cameraRig.position).sub(this._destMarker.position).multiplyScalar(- 1);
    this._helperLine2.scale.copy(tmp);

    ////////////////////////////////////////
    //// MODIFICATIONS FROM THREEJS EXAMPLE
    //// check if in webXR session
    //// if so, provide haptic feedback to the controller that raycasted onto object
    //// (only if haptic actuator is available)
    const session = this._xr.getSession();
    if (session) {
      //only if we are in a webXR session
      for (const sourceXR of session.inputSources) {
        // console.log(sourceXR)

        if (!sourceXR.gamepad) continue;
        if (
          sourceXR &&
          sourceXR.gamepad &&
          (sourceXR.gamepad.axes[2] || sourceXR.gamepad.axes[3]) &&
          sourceXR.handedness == this._hander
        ) {
          // var didPulse = sourceXR.gamepad.hapticActuators[0].pulse(0.8, 100);

          // joystick input
          // [0,0,좌우,상하]
          //   -1
          // -1   1
          //    1

          // hander 테스트 ...

          // joystick 4 개의 값으로서부터 추출 ...
          // 이조이스틱 숫자를 보여주는 법이 뭐가 있을까 ???
          //   console.log(sourceXR.gamepad.axes)
          let axes = sourceXR.gamepad.axes;
          // x vector , z vector 구분 필요없이 걍 곱해주면 되는거 아닌가 ?

          //   tmpVec.set(-axes[2], 0, -axes[3]);
          this._destHand.getWorldDirection(cameraVec);
          //   let z = this._destHand.getWorldDirection().z;
          //   tmpVec.set(-axes[2] * x, 0, -axes[3] * z);
          // y 는 0으로 하고
          // z 도 그래로인가 ??

          forwardVec.set(
            cameraVec.x,
            0,
            cameraVec.z
          );

          rightVec.copy(forwardVec);

          rightVec.applyAxisAngle(upVec, Math.PI / 2);

          forwardVec.multiplyScalar(-axes[3]);
          rightVec.multiplyScalar(-axes[2]);

          tmpVec.addVectors(forwardVec, rightVec);

          tmpVec.normalize();

          tmpMatrix.lookAt(centerVec, tmpVec, upVec);

          tmpQuaternion.setFromRotationMatrix(tmpMatrix);
          this._destMarker.setRotationFromQuaternion(tmpQuaternion);
        }
      }
    }
    ////
    ////////////////////////////////
  }

  teleport() {
    this._resultVector = this._tmpVector.subVectors(
      this._destHandPos,
      this._playerHandPos
    );
    this._cameraRig.position.add(
      this._resultVector.multiplyScalar(this._multiplyScalar)
    );

    // this._cameraRig.lookAt(0,0,0)
    // this._cameraRig.lookAt(0, this._cameraRig.position.y, 0)

    // this._cameraRig.lookAt(0, this._cameraRig.position.y, 0)
    // 0 , 0 을 각각 축 axis 로 해야겠네 ...


    this._destMarker.getWorldDirection(directionVec);

    tmpMatrix.lookAt(centerVec, directionVec, upVec);

    tmpQuaternion.setFromRotationMatrix(tmpMatrix);
    this._cameraRig.setRotationFromQuaternion(tmpQuaternion);
  }
}
