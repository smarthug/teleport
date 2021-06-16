import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

export default function Loader(path, root , after=()=>{}) {
  const loader = new GLTFLoader()
    // .setCrossOrigin('anonymous')
    .setDRACOLoader(new DRACOLoader().setDecoderPath("assets/wasm/"))
    .setKTX2Loader(new KTX2Loader().setTranscoderPath("assets/wasm/"))
    .setMeshoptDecoder(MeshoptDecoder);

  const blobURLs = [];

  //.detectSupport(renderer)

  loader.load(path, (gltf) => {
    const scene2 = gltf.scene || gltf.scenes[0];
    const clips = gltf.animations || [];
    if (!scene2) {
      // Valid, but not supported by this viewer.
      throw new Error(
        "This model contains no scene, and cannot be viewed here. However," +
          " it may contain individual 3D resources."
      );
    }

    root.add(scene2);
    after(scene2);
  });

}
