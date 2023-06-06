import React, { useEffect, useRef } from "react";
import { Engine, Scene, Vector3, MeshBuilder, StandardMaterial, Color3, ArcRotateCamera } from "@babylonjs/core";
import { GLTFLoader } from "@babylonjs/loaders/glTF";
const BabylonCard = ({ children }) => {
  const cardRef = useRef();

  useEffect(() => {
    // Set up Babylon.js engine, scene, and camera
    const canvas = document.createElement("canvas");
    cardRef.current.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      10,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.wheelPrecision = 100;

    // ...

    engine.runRenderLoop(() => {
      scene.render();
    });

    const cardElement = cardRef.current.querySelector("div");
    cardElement.style.display = "none";

    // Create a plane for the card
    const cardPlane = MeshBuilder.CreatePlane(
      "cardPlane",
      { width: 10, height: 5 },
      scene
    );
    cardPlane.position.z -= 2;

    // Apply the glass material
    const glass = new StandardMaterial("glass", scene);
    glass.alpha = 0.2;
    glass.specularColor = new Color3(0.6, 0.6, 0.6);
    glass.emissiveColor = new Color3(0.2, 0.2, 0.2);
    glass.ambientColor = new Color3(0.23, 0.98, 0.53);

    cardPlane.material = glass;

    // ...

    // ... also update the cleanup function
    return () => {
      engine.dispose();
      scene.dispose();
    };
  }, []);

  return (
    <div ref={cardRef} className="relative">
      {children}
    </div>
  );
};

export default BabylonCard;
