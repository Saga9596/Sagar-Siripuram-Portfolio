import * as THREE from 'three';

// Define the structure for our scene keyframes
interface SceneConfig {
  fogColor: number;
  ambientLightColor: number;
  ambientLightIntensity: number;
  sunPosition: THREE.Vector3;
  sunColor: number;
  sunIntensity: number;
  waterColor: number;
  treeScaleMultiplier: number;
  particles: {
    enabled: boolean;
    count: number;
    color: number;
    size: number;
  };
}

export type SceneKey = 'about' | 'projects' | 'impact-metrics' | 'skills' | 'blog' | 'contact';

// Define the keyframes for each section
const sceneKeyframes: Record<SceneKey, SceneConfig> = {
  about: { // Dawn
    fogColor: 0x87ceeb,
    ambientLightColor: 0x404040,
    ambientLightIntensity: 0.8,
    sunPosition: new THREE.Vector3(-50, 20, -50),
    sunColor: 0xffdab9,
    sunIntensity: 1.2,
    waterColor: 0x6083c2,
    treeScaleMultiplier: 0.5, // Saplings
    particles: { enabled: false, count: 0, color: 0, size: 0 },
  },
  projects: { // Midday
    fogColor: 0xaaddff,
    ambientLightColor: 0xffffff,
    ambientLightIntensity: 1.0,
    sunPosition: new THREE.Vector3(0, 100, 50),
    sunColor: 0xffffff,
    sunIntensity: 1.5,
    waterColor: 0x00bfff,
    treeScaleMultiplier: 1.0, // Mature trees
    particles: { enabled: false, count: 0, color: 0, size: 0 },
  },
  'impact-metrics': { // Evening
    fogColor: 0x2c3e50,
    ambientLightColor: 0x404040,
    ambientLightIntensity: 0.6,
    sunPosition: new THREE.Vector3(50, 15, -50),
    sunColor: 0xff8c00,
    sunIntensity: 1.0,
    waterColor: 0x1a2a56,
    treeScaleMultiplier: 1.2, // Deeper forest
    particles: { enabled: true, count: 200, color: 0xffff00, size: 0.1 }, // Fireflies
  },
  skills: { // Bright Daylight
    fogColor: 0x87cefa,
    ambientLightColor: 0xffffff,
    ambientLightIntensity: 1.2,
    sunPosition: new THREE.Vector3(20, 80, 20),
    sunColor: 0xfff5e1,
    sunIntensity: 1.8,
    waterColor: 0x1e90ff,
    treeScaleMultiplier: 0.9, // Diverse vegetation
    particles: { enabled: false, count: 0, color: 0, size: 0 },
  },
  blog: { // Sunset
    fogColor: 0xfd5e53,
    ambientLightColor: 0x663344,
    ambientLightIntensity: 0.7,
    sunPosition: new THREE.Vector3(60, 10, 0),
    sunColor: 0xff4500,
    sunIntensity: 1.5,
    waterColor: 0x8a4d57,
    treeScaleMultiplier: 1.0,
    particles: { enabled: false, count: 0, color: 0, size: 0 },
  },
  contact: { // Night
    fogColor: 0x0c0d21,
    ambientLightColor: 0x222233,
    ambientLightIntensity: 0.5,
    sunPosition: new THREE.Vector3(-30, 40, -30), // Moon
    sunColor: 0xaaaadd,
    sunIntensity: 0.8,
    waterColor: 0x050a19,
    treeScaleMultiplier: 1.1,
    particles: { enabled: true, count: 1000, color: 0xffffff, size: 0.05 }, // Stars
  },
};

export class EcoSceneManager {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private onWebGLUnsupported: () => void;

  private sun: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private water: THREE.Mesh;
  private trees: THREE.Group[] = [];
  private particles: THREE.Points | null = null;

  private currentKey: SceneKey = 'about';
  private targetKey: SceneKey | null = null;
  private transitionProgress = 1;
  private transitionDuration = 0.6; // 600ms

  constructor(canvas: HTMLCanvasElement, onWebGLUnsupported: () => void) {
    this.canvas = canvas;
    this.onWebGLUnsupported = onWebGLUnsupported;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.clock = new THREE.Clock();

    // Initialize with default values
    this.sun = new THREE.DirectionalLight();
    this.ambientLight = new THREE.AmbientLight();
    const waterGeom = new THREE.PlaneGeometry(200, 200, 50, 50);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x00bfff, roughness: 0.1, metalness: 0.8 });
    this.water = new THREE.Mesh(waterGeom, waterMat);
  }

  public init() {
    try {
      // Verify canvas is ready for WebGL
      if (!this.canvas || !this.canvas.getContext) {
        throw new Error('Invalid canvas element');
      }

      // Create renderer with robust WebGL context attributes
      this.renderer = new THREE.WebGLRenderer({ 
        canvas: this.canvas, 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
        precision: 'mediump',
        stencil: false,
        depth: true
      });
      
      // Verify renderer was created successfully
      if (!this.renderer) {
        throw new Error('Failed to create WebGL renderer');
      }

      const gl = this.renderer.getContext();
      if (!gl) {
        throw new Error('Failed to get WebGL context from renderer');
      }

      // Test basic WebGL functionality
      const testShader = gl.createShader(gl.VERTEX_SHADER);
      if (!testShader) {
        throw new Error('WebGL context is not functional - cannot create shader');
      }
      gl.deleteShader(testShader);

      // Log WebGL info for debugging
      console.log('WebGL Version:', gl.getParameter(gl.VERSION));
      console.log('WebGL Vendor:', gl.getParameter(gl.VENDOR));
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        console.log('WebGL Renderer:', gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
      }

      // Mark canvas as initialized by Three.js
      (this.canvas as any).__threeJSInitialized = true;
      
    } catch (e) {
      console.error('Failed to initialize WebGL renderer:', e);
      this.onWebGLUnsupported();
      return;
    }
    
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    this.camera.position.set(0, 5, 20);
    this.scene.fog = new THREE.Fog(0x87ceeb, 1, 150);

    // Lights
    this.scene.add(this.sun);
    this.scene.add(this.ambientLight);

    // Terrain
    const terrainGeom = new THREE.PlaneGeometry(200, 200, 100, 100);
    const terrainMat = new THREE.MeshStandardMaterial({ color: 0x556b2f, roughness: 1 });
    const terrain = new THREE.Mesh(terrainGeom, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -1;
    this.scene.add(terrain);

    // Water
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = -0.5;
    this.scene.add(this.water);

    // Trees will be generated based on roadmap data
    // Initial trees for the default scene
    const initialCo2 = 50;
    const treeCount = Math.floor(initialCo2 / 5); // 5 tons CO2 per tree
    for (let i = 0; i < treeCount; i++) {
      const tree = this.createTree();
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 50;
      tree.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      tree.rotation.y = Math.random() * Math.PI;
      this.trees.push(tree);
      this.scene.add(tree);
    }

    this.applyKeyframe(sceneKeyframes.about, true);
    window.addEventListener('resize', this.onResize);
  }

  private createTree(): THREE.Group {
    const group = new THREE.Group();
    const trunkGeom = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeom, trunkMat);
    trunk.position.y = 1;
    group.add(trunk);

    const foliageGeom = new THREE.IcosahedronGeometry(1.5, 0);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x228b22, flatShading: true });
    const foliage = new THREE.Mesh(foliageGeom, foliageMat);
    foliage.position.y = 3;
    group.add(foliage);

    return group;
  }

  private createParticles(config: SceneConfig['particles']) {
    if (this.particles) {
      this.scene.remove(this.particles);
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
      this.particles = null;
    }

    if (!config.enabled || config.count === 0) return;

    const vertices = [];
    for (let i = 0; i < config.count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 20;
      const z = (Math.random() - 0.5) * 100;
      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({
      color: config.color,
      size: config.size,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private applyKeyframe(config: SceneConfig, immediate = false) {
    if (immediate) {
      this.scene.fog!.color.set(config.fogColor);
      this.ambientLight.color.set(config.ambientLightColor);
      this.ambientLight.intensity = config.ambientLightIntensity;
      this.sun.position.copy(config.sunPosition);
      this.sun.color.set(config.sunColor);
      this.sun.intensity = config.sunIntensity;
      (this.water.material as THREE.MeshStandardMaterial).color.set(config.waterColor);
      this.trees.forEach(tree => tree.scale.setScalar(config.treeScaleMultiplier));
      this.createParticles(config.particles);
    } else {
      // Lerping is handled in the animate loop
    }
  }

  public transitionTo = (key: SceneKey, co2Metric?: number) => {
    if (key === this.currentKey || key === this.targetKey) return;
    this.targetKey = key;
    this.transitionProgress = 0;
    this.createParticles(sceneKeyframes[key].particles); // Create new particles immediately
    
    // Update tree count based on CO₂ metric if provided
    if (co2Metric !== undefined) {
      this.updateTreeCount(co2Metric);
    }
  };

  private updateTreeCount(co2Metric: number) {
    const targetTreeCount = Math.floor(co2Metric / 5); // 5 tons CO2 per tree
    const currentTreeCount = this.trees.length;
    
    if (targetTreeCount > currentTreeCount) {
      // Add more trees
      for (let i = currentTreeCount; i < targetTreeCount; i++) {
        const tree = this.createTree();
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 50;
        tree.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        tree.rotation.y = Math.random() * Math.PI;
        tree.scale.setScalar(0); // Start invisible for animation
        this.trees.push(tree);
        this.scene.add(tree);
        
        // Animate tree growth
        const targetScale = sceneKeyframes[this.currentKey].treeScaleMultiplier;
        const animateGrowth = () => {
          tree.scale.x += 0.02;
          tree.scale.y += 0.02;
          tree.scale.z += 0.02;
          if (tree.scale.x < targetScale) {
            requestAnimationFrame(animateGrowth);
          } else {
            tree.scale.setScalar(targetScale);
          }
        };
        setTimeout(() => animateGrowth(), i * 100); // Stagger growth
      }
    } else if (targetTreeCount < currentTreeCount) {
      // Remove excess trees
      for (let i = currentTreeCount - 1; i >= targetTreeCount; i--) {
        const tree = this.trees[i];
        this.scene.remove(tree);
        tree.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        this.trees.splice(i, 1);
      }
    }
  };

  private onResize = () => {
    if (!this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  public animate = () => {
    if (!this.renderer) return;
    requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();

    // Handle scene transitions
    if (this.targetKey && this.transitionProgress < 1) {
      this.transitionProgress += delta / this.transitionDuration;
      this.transitionProgress = Math.min(this.transitionProgress, 1);

      const from = sceneKeyframes[this.currentKey];
      const to = sceneKeyframes[this.targetKey];

      this.scene.fog!.color.lerpColors(new THREE.Color(from.fogColor), new THREE.Color(to.fogColor), this.transitionProgress);
      this.ambientLight.color.lerpColors(new THREE.Color(from.ambientLightColor), new THREE.Color(to.ambientLightColor), this.transitionProgress);
      this.ambientLight.intensity = THREE.MathUtils.lerp(from.ambientLightIntensity, to.ambientLightIntensity, this.transitionProgress);
      this.sun.position.lerpVectors(from.sunPosition, to.sunPosition, this.transitionProgress);
      this.sun.color.lerpColors(new THREE.Color(from.sunColor), new THREE.Color(to.sunColor), this.transitionProgress);
      this.sun.intensity = THREE.MathUtils.lerp(from.sunIntensity, to.sunIntensity, this.transitionProgress);
      (this.water.material as THREE.MeshStandardMaterial).color.lerpColors(new THREE.Color(from.waterColor), new THREE.Color(to.waterColor), this.transitionProgress);
      
      const scale = THREE.MathUtils.lerp(from.treeScaleMultiplier, to.treeScaleMultiplier, this.transitionProgress);
      this.trees.forEach(tree => tree.scale.setScalar(scale));

      if (this.transitionProgress >= 1) {
        this.currentKey = this.targetKey;
        this.targetKey = null;
      }
    }

    // Animate water
    const time = this.clock.getElapsedTime();
    const positions = (this.water.geometry as THREE.PlaneGeometry).attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = 0.1 * Math.sin(positions.getX(i) * 0.5 + time * 0.5) + 0.05 * Math.sin(positions.getZ(i) * 0.8 + time * 0.8);
      positions.setY(i, y);
    }
    positions.needsUpdate = true;

    // Animate particles (fireflies)
    if (this.particles && (this.currentKey === 'impact-metrics' || this.targetKey === 'impact-metrics')) {
        const particlePositions = this.particles.geometry.attributes.position;
        for (let i = 0; i < particlePositions.count; i++) {
            const y = particlePositions.getY(i);
            particlePositions.setY(i, y + Math.sin(time + i) * 0.01);
        }
        particlePositions.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public cleanup = () => {
    window.removeEventListener('resize', this.onResize);
    
    // Clean up Three.js initialization marker
    if (this.canvas) {
      delete (this.canvas as any).__threeJSInitialized;
    }
    
    // Dispose of all scene objects first
    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
      if (object instanceof THREE.Points) {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          (object.material as THREE.Material).dispose();
        }
      }
    });
    
    // Clear scene
    this.scene.clear();
    
    // Dispose of renderer and force context loss
    if (this.renderer) {
      const gl = this.renderer.getContext();
      
      // Force context loss to free WebGL resources
      if (gl) {
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
      
      // Dispose renderer
      this.renderer.dispose();
      this.renderer = null;
    }
    
    console.log('EcoSceneManager cleaned up successfully.');
  };
}