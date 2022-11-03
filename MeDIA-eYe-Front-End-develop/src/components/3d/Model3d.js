import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLModel, JSONModel, OBJModel, GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";

export default function Model3dOld({ model }) {

  const [imgRef, setImgRef] = useState(null);
  const [wSize, setWSize] = useState(window.innerWidth);
  const [obj3DCanvas, setObj3dCanvas] = useState({ inited: false });
  const [raf, setRaf] = useState({ current: null });

  const animate = () => {
    if (!obj3DCanvas.inited) {
      return;
    }

    raf.current = requestAnimationFrame(animate);

    obj3DCanvas.obj.scene.rotation.y += 0.06;
    obj3DCanvas.renderer.render(obj3DCanvas.scene, obj3DCanvas.camera);
    obj3DCanvas.orbit.update();
  };

  const cleanRaf = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
    }
  };

  useEffect(() => {
    cleanRaf();
    animate();

    return () => cleanRaf();
  }, [obj3DCanvas]);

  const resizeHandler = () => {
    const size = window.innerWidth;

    if (size !== wSize) {
      setWSize(size);
    }
  };

  useEffect(() => {
    if (imgRef === null) {
      return;
    }

    let scene, camera, renderer, loader, obj, orbit;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    camera.position.z = 6;

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(imgRef.offsetWidth, imgRef.offsetWidth);

    imgRef.innerHTML = '';
    imgRef.append(renderer.domElement);

    loader = new GLTFLoader();
    obj = null;

    orbit = new OrbitControls(camera, renderer.domElement);

    loader.load(model, (gltf) => {
      obj = gltf;

      const box = new THREE.Box3().setFromObject(obj.scene);
      const scale = Math.abs(2 / box.min.x);

      obj.scene.scale.set(scale, scale, scale);
      //const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
      //scene.add( ambientLight );
      scene.add(obj.scene);
      renderer.render(scene, camera);

      setObj3dCanvas({
        inited: true,
        scene,
        camera,
        renderer,
        loader,
        obj,
        orbit
      });
    });

    orbit.minDistance = 12;
    orbit.maxDistance = 12;
    orbit.enablePan = false;
    orbit.addEventListener('change', () => {
      renderer.render(scene, camera);
    });
    orbit.update();
  }, [imgRef]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [wSize]);

  return <div className="mediaeymodel" ref={setImgRef}></div>;
}

export function Model3d({ model, type }) {
  const [imgRef, setImgRef] = useState(null);
  return <div className="mediaeymodel" ref={setImgRef}>
    {
      type?.indexOf('text/plain') > -1 || type?.indexOf('text/html') > -1 || type === 'obj' ? (
        <OBJModel src={model} width={imgRef?.offsetWidth} />
      ) : type?.indexOf('json') > -1 ? (
        <JSONModel src={model} width={imgRef?.offsetWidth} />
      ) : (
        <GLTFModel
          height={imgRef?.offsetWidth}
          width={imgRef?.offsetWidth}
          src={model}
          enableZoom
        >
          <AmbientLight color={0x00FFFFFF} />
          <DirectionLight
            color={0xffffff}
            position={{ x: 100, y: 200, z: 100 }}
          />
          <DirectionLight
            color={0xff00ff}
            position={{ x: -500, y: 200, z: -100 }}
          />
        </GLTFModel>
      )
    }

  </div>;
}

export function Model3dSmall({ model, type }) {
  const [imgRef, setImgRef] = useState(null);
  return <div className="mediaeymodel mediaeymodel-small" ref={setImgRef}>
    {
      type?.indexOf('text/plain') > -1 || type?.indexOf('text/html') > -1 || type === 'obj' ? (
        <OBJModel src={model} width={imgRef?.offsetWidth} position={{ x: 0, y: -0.9, z: -5 }} />
      ) : type?.indexOf('json') > -1 ? (
        <JSONModel src={model} width={imgRef?.offsetWidth} />
      ) : (
        <GLTFModel
          height={imgRef?.offsetWidth}
          width={imgRef?.offsetWidth}
          src={model}
          enableZoom
        >
          <AmbientLight color={0x00FFFFFF} />
          <DirectionLight
            color={0xffffff}
            position={{ x: 100, y: 200, z: 100 }}
          />
          <DirectionLight
            color={0xff00ff}
            position={{ x: -500, y: 200, z: -100 }}
          />
        </GLTFModel>
      )
    }

  </div>;
}
