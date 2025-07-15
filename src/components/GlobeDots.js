import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DotSphere() {
  const ref = useRef();
  const [landPoints, setLandPoints] = useState([]);

  useEffect(() => {
    fetch('/land.json')
      .then(res => res.json())
      .then(data => {
        const points = [];

        data.features.forEach(feature => {
          const coords = feature.geometry.coordinates;

          const processCoords = (coordSet) => {
            coordSet.forEach(polygon => {
              polygon.forEach(coord => {
                if (!Array.isArray(coord) || coord.length < 2) return;
                const [lon, lat] = coord;
                if (typeof lat !== 'number' || typeof lon !== 'number' || isNaN(lat) || isNaN(lon)) return;

                const phi = (90 - lat) * (Math.PI / 180);
                const theta = (lon + 180) * (Math.PI / 180);
                const x = -Math.sin(phi) * Math.cos(theta);
                const y = Math.cos(phi);
                const z = Math.sin(phi) * Math.sin(theta);
                points.push(new THREE.Vector3(x, y, z));
              });
            });
          };

          if (feature.geometry.type === 'Polygon') {
            processCoords([feature.geometry.coordinates]);
          }
          if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(polygon => processCoords(polygon));
          }
        });

        setLandPoints(points);
        console.log("Loaded land dots:", points.length);
      });
  }, []);

  const landGeometry = new THREE.BufferGeometry().setFromPoints(landPoints);

  const landCoords = [
    [43.7, -79.4],
    [41.8, -87.6],
    [19.4, -99.1],
    [51.5, -0.1],
    [6.9, 79.9],
    [-18.9, 47.5],
    [23.0, 72.6],
    [55.8, 37.6],
    [39.9, 116.4],
    [-37.8, 144.9],
    [22.3, 114.2]
  ];

  const cityPoints = landCoords.map(([lat, lon]) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  });

  const tubeGeometries = [];
  for (let i = 0; i < cityPoints.length; i++) {
    for (let j = i + 1; j < cityPoints.length; j++) {
      const start = cityPoints[i];
      const end = cityPoints[j];
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.4);
      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      const geometry = new THREE.TubeGeometry(curve, 64, 0.002, 6, false);
      tubeGeometries.push(geometry);
    }
  }

  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: '#ff3366',
    emissive: '#ff3366',
    emissiveIntensity: 1.2,
    roughness: 0.5,
    metalness: 0.3,
    transparent: true,
    opacity: 0.6,
    wireframe: true
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={ref}>
      <points geometry={landGeometry}>
        <pointsMaterial color="#00ffcc" size={0.01} />
      </points>
      <points geometry={new THREE.BufferGeometry().setFromPoints(cityPoints)}>
        <pointsMaterial color="#ff3366" size={0.04} />
      </points>
      {tubeGeometries.map((geom, idx) => (
        <mesh key={idx} geometry={geom} material={tubeMaterial} />
      ))}
    </group>
  );
}

export default function GlobeDots() {
  return (
    <div className="globe-canvas">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <DotSphere />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}