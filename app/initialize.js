import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { OBJFileLoader } from 'babylonjs-loaders';

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true, true);

function bootstrap (canvas, engine) {
  const scene = new BABYLON.Scene(engine);
  scene.debugLayer.show();
  const camera = new BABYLON.ArcRotateCamera("bootstrap-camera", Math.PI/2, Math.PI/2, 2, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("bootstrap-light", new BABYLON.Vector3(5, 5, 0), scene);

  // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

  OBJFileLoader.OPTIMIZE_WITH_UV = true;
  BABYLON.SceneLoader.ImportMesh("patrick-large", "./", "patrick-stumble.babylon", scene, (meshes, particles, skeletons) => {
    console.dir(meshes);
    console.dir(skeletons);

    skeletons[0].bones.forEach((bone) => {
      const s = bone.getScale().x * 10000;
      bone.scale(1, 1, 1, false);
    });
    scene.beginAnimation(skeletons[0], 0, 22, true, 0.5);
  });

  return scene;
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  const scene = bootstrap(canvas, engine);
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());

  console.log('Initialized app');
});
