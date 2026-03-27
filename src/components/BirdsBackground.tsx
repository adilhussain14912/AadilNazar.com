import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BirdsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const birdsRef = useRef<any[]>([]);
  const cameraRef = useRef<THREE.Camera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 100, 1000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create birds
    const birds: any[] = [];
    const birdGeometry = new THREE.ConeGeometry(0.5, 2, 8);
    
    // Create multiple materials for different colored birds
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x00ff88, emissive: 0x00aa44 }),
      new THREE.MeshPhongMaterial({ color: 0xff00ff, emissive: 0xaa00aa }),
      new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x00aaaa }),
      new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xaaaa00 }),
    ];

    for (let i = 0; i < 50; i++) {
      const bird = new THREE.Mesh(birdGeometry, materials[i % materials.length]);
      bird.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
      bird.rotation.y = Math.random() * Math.PI * 2;
      
      scene.add(bird);
      
      birds.push({
        mesh: bird,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        acceleration: new THREE.Vector3(0, 0, 0),
      });
    }
    birdsRef.current = birds;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff88, 1, 200);
    pointLight1.position.set(100, 100, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 1, 200);
    pointLight2.position.set(-100, -100, 100);
    scene.add(pointLight2);

    // Flocking behavior
    const rules = {
      separation: (birds: any[], bird: any, index: number) => {
        const desiredSeparation = 25;
        let steer = new THREE.Vector3(0, 0, 0);
        let count = 0;

        for (let i = 0; i < birds.length; i++) {
          if (i === index) continue;
          const d = bird.mesh.position.distanceTo(birds[i].mesh.position);

          if (d < desiredSeparation) {
            const diff = new THREE.Vector3().subVectors(
              bird.mesh.position,
              birds[i].mesh.position
            );
            diff.normalize();
            diff.multiplyScalar(1 / Math.max(d, 0.1));
            steer.add(diff);
            count++;
          }
        }

        if (count > 0) steer.multiplyScalar(1 / count);
        if (steer.length() > 0) {
          steer.normalize();
          steer.multiplyScalar(0.05);
        }
        return steer;
      },

      alignment: (birds: any[], bird: any) => {
        const neighborDistance = 50;
        const avg = new THREE.Vector3(0, 0, 0);
        let count = 0;

        for (let i = 0; i < birds.length; i++) {
          const d = bird.mesh.position.distanceTo(birds[i].mesh.position);
          if (d < neighborDistance) {
            avg.add(birds[i].velocity);
            count++;
          }
        }

        if (count > 0) {
          avg.multiplyScalar(1 / count);
          avg.normalize();
          avg.multiplyScalar(0.01);
        }
        return avg;
      },

      cohesion: (birds: any[], bird: any) => {
        const neighborDistance = 50;
        const steering = new THREE.Vector3(0, 0, 0);
        const sum = new THREE.Vector3(0, 0, 0);
        let count = 0;

        for (let i = 0; i < birds.length; i++) {
          const d = bird.mesh.position.distanceTo(birds[i].mesh.position);
          if (d < neighborDistance) {
            sum.add(birds[i].mesh.position);
            count++;
          }
        }

        if (count > 0) {
          sum.multiplyScalar(1 / count);
          steering.subVectors(sum, bird.mesh.position);
          steering.normalize();
          steering.multiplyScalar(0.01);
        }
        return steering;
      },
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      birds.forEach((bird, index) => {
        // Apply flocking rules
        const separation = rules.separation(birds, bird, index);
        const alignment = rules.alignment(birds, bird);
        const cohesion = rules.cohesion(birds, bird);

        bird.acceleration.add(separation);
        bird.acceleration.add(alignment);
        bird.acceleration.add(cohesion);

        // Update velocity
        bird.velocity.add(bird.acceleration);
        bird.velocity.limit = (max: number) => {
          if (bird.velocity.length() > max) {
            bird.velocity.normalize().multiplyScalar(max);
          }
        };
        bird.velocity.limit(2);

        // Update position
        bird.mesh.position.add(bird.velocity);
        
        // Wrap around edges
        const boundary = 150;
        if (bird.mesh.position.x > boundary) bird.mesh.position.x = -boundary;
        if (bird.mesh.position.x < -boundary) bird.mesh.position.x = boundary;
        if (bird.mesh.position.y > boundary) bird.mesh.position.y = -boundary;
        if (bird.mesh.position.y < -boundary) bird.mesh.position.y = boundary;
        if (bird.mesh.position.z > boundary) bird.mesh.position.z = -boundary;
        if (bird.mesh.position.z < -boundary) bird.mesh.position.z = boundary;

        // Orient bird towards velocity direction
        if (bird.velocity.length() > 0) {
          bird.mesh.lookAt(
            new THREE.Vector3(
              bird.mesh.position.x + bird.velocity.x,
              bird.mesh.position.y + bird.velocity.y,
              bird.mesh.position.z + bird.velocity.z
            )
          );
        }

        // Reset acceleration
        bird.acceleration.multiplyScalar(0);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      (cameraRef.current as THREE.PerspectiveCamera).aspect = width / height;
      (cameraRef.current as THREE.PerspectiveCamera).updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default BirdsBackground;
