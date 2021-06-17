/* eslint-disable prettier/prettier */
import * as THREE from "three";

const tmpQuaternion = new THREE.Quaternion();
const tmpMatrix = new THREE.Matrix4();

const centerVec = new THREE.Vector3(0, 0, 0);
const upVec = new THREE.Vector3(0, 1, 0);

const cameraVec = new THREE.Vector3();
const forwardVec = new THREE.Vector3();
const rightVec = new THREE.Vector3();
const tmpVec = new THREE.Vector3();
const directionVec = new THREE.Vector3();

const tmp = new THREE.Vector3();

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
    {
      destMarker,
      rightHanded = true,
      playerHandHelper,
      destHandHelper,
      multiplyScalar = 3
    } = {}
  ) {
    super();

    this._xr = renderer.xr;

    // player
    this._cameraRig = cameraRig;

    this._hander = rightHanded ? "right" : "left"

    if (destMarker === undefined) {
      destMarker = new THREE.Object3D();
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.5, 32), new THREE.MeshNormalMaterial({ wireframe: true }));
      cone.rotateX(90 * Math.PI / 180)
      destMarker.add(cone)
      this._cameraRig.parent.add(destMarker)
    }

    // a hand that represent player's position
    // 컨트롤러 그자체로 하는가 맞을까 ??
    // this._playerHand = new THREE.Mesh(
    //   new THREE.SphereBufferGeometry(0.05, 100, 100),
    //   new THREE.MeshStandardMaterial({ color: "green" })
    // );
    this._playerHand = new THREE.Object3D();
    this._playerHand.position.set(0, 0.05, 0);
    console.log(playerHandHelper)
    if (playerHandHelper === undefined) {

    } else {
      this._playerHand.add(playerHandHelper)

    }
    // this._playerHand.add(playerHandHelper)

    // a hand that represent the destination to teleport
    // this._destHand = new THREE.Mesh(
    //   new THREE.SphereBufferGeometry(0.05, 100, 100),
    //   new THREE.MeshStandardMaterial({ color: "yellow" })
    // );
    this._destHand = new THREE.Object3D();
    this._destHand.position.set(0, 0.05, 0);
    if (destHandHelper === undefined) {

    } else {
      this._destHand.add(destHandHelper);

    }

    // each xr controller hand position represent player positon, teleport destination position
    this._playerHandPos = new THREE.Vector3();
    this._destHandPos = new THREE.Vector3();

    // marker to show where to be teleported
    this._destMarker = destMarker;

    this._tmpVector = new THREE.Vector3();
    this._resultVector = new THREE.Vector3();

    // teleport distance multiply scalar
    this._multiplyScalar = multiplyScalar;

    this._helperLine = new THREE.Line(TranslateHelperGeometry(), matHelper);
    this._helperLine2 = this._helperLine.clone();

    this._cameraRig.parent.add(this._helperLine)
    this._cameraRig.parent.add(this._helperLine2)

    const onSelectEnd = () => {
      this.teleport();
    };

    const onFromSqueezeStart = () => {
      this._multiplyScalar *= 0.5;
    };

    const onToSqueezeStart = () => {
      this._multiplyScalar *= 2;
    };

    controller0.addEventListener("selectend", onSelectEnd);
    controller1.addEventListener("selectend", onSelectEnd);

    if (rightHanded === !isOculusBrowser) {
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




    // tmpMatrix.lookAt(centerVec, tmpVec, upVec);
    tmpMatrix.lookAt(centerVec, new THREE.Vector3(0, 0, 1), upVec);

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


    this._helperLine.position.copy(this._playerHandPos);
    tmp.set(1e-10, 1e-10, 1e-10).add(this._destHandPos).sub(this._playerHandPos);
    this._helperLine.scale.copy(tmp);

    this._helperLine2.position.copy(this._cameraRig.position);
    tmp.set(1e-10, 1e-10, 1e-10).add(this._cameraRig.position).sub(this._destMarker.position).multiplyScalar(- 1);
    this._helperLine2.scale.copy(tmp);


    const session = this._xr.getSession();
    if (session) {
      // only if we are in a webXR session
      for (const sourceXR of session.inputSources) {

        if (!sourceXR.gamepad) continue;
        if (
          sourceXR &&
          sourceXR.gamepad &&
          (sourceXR.gamepad.axes[2] || sourceXR.gamepad.axes[3]) &&
          sourceXR.handedness === this._hander
        ) {
          // var didPulse = sourceXR.gamepad.hapticActuators[0].pulse(0.8, 100);

          // joystick input
          // [0,0,좌우,상하]
          //   -1
          // -1   1
          //    1



          const axes = sourceXR.gamepad.axes;

          this._destHand.getWorldDirection(cameraVec);


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

  }

  teleport() {
    this._resultVector = this._tmpVector.subVectors(
      this._destHandPos,
      this._playerHandPos
    );
    this._cameraRig.position.add(
      this._resultVector.multiplyScalar(this._multiplyScalar)
    );

    this._destMarker.getWorldDirection(directionVec);

    tmpMatrix.lookAt(centerVec, directionVec, upVec);

    tmpQuaternion.setFromRotationMatrix(tmpMatrix);
    this._cameraRig.setRotationFromQuaternion(tmpQuaternion);
  }
}
