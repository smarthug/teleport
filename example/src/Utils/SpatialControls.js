import * as THREE from "three";

export default class SpatialControls extends THREE.EventDispatcher {
  constructor(cameraRig, controller1, controller2, destMarker ,lefthanded=false) {
    super();

    // player
    this._cameraRig = cameraRig;

    // TODO: right, left handed agnostic
    // text FROM rather than Green ball
    //a hand that represent player's position
    // 컨트롤러 그자체로 하는가 맞을까 ??
    this._playerHand = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.05, 100, 100),
      new THREE.MeshStandardMaterial({ color: "green" })
    );
    this._playerHand.position.set(0, 0.05, 0);
    this._playerHand.add();

    // text Destination rather than Green ball
    //a hand that represent the destination to teleport
    this._destHand = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.05, 100, 100),
      new THREE.MeshStandardMaterial({ color: "yellow" })
    );
    this._destHand.position.set(0, 0.05, 0);

    // left , or right handed ???
    
    if(lefthanded){
        controller1.add(this._playerHand);
        controller2.add(this._destHand);
    } else {
        controller2.add(this._playerHand);
        controller1.add(this._destHand);

    }

    // each xr controller hand position represent player positon, teleport destination position
    this._playerHandPos = new THREE.Vector3();
    this._destHandPos = new THREE.Vector3();

    //box
    //marker to show where to be teleported
    this._destMarker = destMarker;

    this._tmpVector = new THREE.Vector3();
    this._resultVector = new THREE.Vector3();

    // teleport distance multiply scalar
    this._multiplyScalar = 3;

    const onSelectEnd = () => {
      this.teleport();
    };

    const onFromSqueezeStart = () => {
    //   this._multiplyScalar--;
      this._multiplyScalar*=2;
    };

    const onToSqueezeStart = () => {
    //   this._multiplyScalar++;
      this._multiplyScalar*=0.5;
    };

    controller1.addEventListener("selectend", onSelectEnd);
    controller2.addEventListener("selectend", onSelectEnd);
    
    
    if(lefthanded){
        controller2.addEventListener("squeezestart", onToSqueezeStart);
        controller1.addEventListener("squeezestart", onFromSqueezeStart);

    } else {
        controller1.addEventListener("squeezestart", onToSqueezeStart);
        controller2.addEventListener("squeezestart", onFromSqueezeStart);
    }

    const loader = new THREE.FontLoader();

    loader.load("fonts/helvetiker_regular.typeface.json",  (font) => {
      const geometry = new THREE.TextGeometry("From", {
        font: font,
        size: 0.05,
        height: 0.05,
      });

      this._playerHand.add(new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()));


      const geometry2 = new THREE.TextGeometry("To", {
        font: font,
        size: 0.05,
        height: 0.05,
      });

      this._destHand.add(new THREE.Mesh(geometry2, new THREE.MeshNormalMaterial()));

    


    });
  }

  update() {
    this._playerHand.getWorldPosition(this._playerHandPos);
    this._destHand.getWorldPosition(this._destHandPos);

    this._tmpVector.subVectors(this._destHandPos, this._playerHandPos);

    this._tmpVector.multiplyScalar(this._multiplyScalar);
    this._destMarker.position.copy(
      this._tmpVector.add(this._cameraRig.position)
    );

    // player.getWorldQuaternion(tmpQuaternion);

    // deltaLine.position.copy(playerPos);
    // tmp.set(1e-10, 1e-10, 1e-10).add(destinationPos).sub(playerPos);
    // deltaLine.scale.copy(tmp);

    // deltaLine2.position.copy(cameraRig.position);
    // tmp.set(1e-10, 1e-10, 1e-10).add(cameraRig.position).sub(box.position).multiplyScalar(- 1);
    // deltaLine2.scale.copy(tmp);
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
  }
}
