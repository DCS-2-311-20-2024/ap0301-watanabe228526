//
// 応用プログラミング 第3回 課題1 (ap0301)
// G384002023 拓殖太郎
//
"use strict"; // 厳格モード

import * as THREE from 'three';
import GUI from 'ili-gui';
import { makeMetalRobot, makeCBRobot } from './robot.js'

// ３Ｄページ作成関数の定義
function init() {
  const param = { // カメラの設定値
    fov: 60, // 視野角
    x: 30,
    y: 20,
    z: 40,
  };

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // ロボットの作成
  const robot = makeMetalRobot();
  scene.add(robot);

  // 光源の設定
  const light = new THREE.SpotLight();
  light.position.set(0, 30, 30);
  scene.add(light);
  
  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    param.fov, window.innerWidth/window.innerHeight, 0.1, 1000);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x104040 );
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // 描画関数の定義
  function render() {
    camera.fov = param.fov;
    camera.position.x = param.x;
    camera.position.y = param.y;
    camera.position.z = param.z;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  // カメラのコントローラ
  const gui = new GUI();
  gui.add(param, "fov", 10, 100).onChange(render);
  gui.add(param, "x", -50, 50).onChange(render);
  gui.add(param, "y", -50, 50).onChange(render);
  gui.add(param, "z", -50, 50).onChange(render);
  
  // 描画
  render();
}

// 3Dページ作成関数の呼び出し
init();
