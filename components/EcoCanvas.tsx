import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { EcoSceneManager, SceneKey } from '../helpers/ecoSceneManager';
import styles from './EcoCanvas.module.css';

// Singleton instance tracker to prevent multiple canvases
let globalCanvasInstance: {
  id: string;
  canvas: HTMLCanvasElement;
  sceneManager: EcoSceneManager;
  container: HTMLDivElement;
} | null = null;

export const EcoCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWebGLUnsupported, setIsWebGLUnsupported] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const componentIdRef = useRef(`eco-canvas-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const location = useLocation();

  const handleWebGLUnsupported = useCallback(() => {
    console.warn('WebGL is not supported. Falling back to static SVG.');
    setIsWebGLUnsupported(true);
  }, []);

  const testWebGLSupport = useCallback((): boolean => {
    try {
      // Create a completely isolated test canvas
      const testCanvas = document.createElement('canvas');
      testCanvas.width = 1;
      testCanvas.height = 1;
      testCanvas.style.position = 'absolute';
      testCanvas.style.left = '-9999px';
      testCanvas.style.top = '-9999px';
      
      // Add to body temporarily for context creation
      document.body.appendChild(testCanvas);
      
      const context = testCanvas.getContext('webgl', { 
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default'
      }) || testCanvas.getContext('experimental-webgl', {
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default'
      });
      
      const isSupported = context !== null && 'createShader' in context;
      
      // Clean up immediately
      if (context && 'getExtension' in context) {
        const loseContext = context.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
      
      document.body.removeChild(testCanvas);
      
      return isSupported;
    } catch (error) {
      console.warn('WebGL test failed:', error);
      return false;
    }
  }, []);

  const createIsolatedCanvas = useCallback((): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      // Wait for the DOM to be completely settled
      setTimeout(() => {
        try {
          // Check if a global instance already exists
          if (globalCanvasInstance && document.contains(globalCanvasInstance.canvas)) {
            console.log('Reusing existing global canvas instance');
            resolve(globalCanvasInstance.canvas);
            return;
          }

          // Create completely unique canvas with multiple identifiers
          const uniqueId = `three-webgl-canvas-${Date.now()}-${Math.random().toString(36).substr(2, 12)}`;
          const canvas = document.createElement('canvas');
          
          // Add multiple unique identifiers to prevent any interference
          canvas.setAttribute('data-three-canvas', uniqueId);
          canvas.setAttribute('data-eco-canvas', componentIdRef.current);
          canvas.setAttribute('data-webgl-isolated', 'true');
          canvas.id = uniqueId;
          
          // Set canvas properties to prevent any external access attempts
          canvas.className = styles.ecoCanvas;
          canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
          canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          
          // Mark canvas as reserved for Three.js
          (canvas as any).__reservedForThreeJS = true;
          (canvas as any).__ecoCanvasId = componentIdRef.current;
          
          console.log(`Created isolated canvas with ID: ${uniqueId}`);
          resolve(canvas);
        } catch (error) {
          console.error('Failed to create isolated canvas:', error);
          reject(error);
        }
      }, 200); // Increased delay to ensure DOM settling
    });
  }, []);

  const initializeWebGLScene = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      // Double-check WebGL support before proceeding
      if (!testWebGLSupport()) {
        handleWebGLUnsupported();
        return;
      }

      // Clean up any existing global instance first
      if (globalCanvasInstance) {
        console.log('Cleaning up existing global canvas instance');
        try {
          globalCanvasInstance.sceneManager.cleanup();
          if (document.contains(globalCanvasInstance.canvas)) {
            globalCanvasInstance.container.removeChild(globalCanvasInstance.canvas);
          }
        } catch (cleanupError) {
          console.warn('Error during cleanup:', cleanupError);
        }
        globalCanvasInstance = null;
      }

      // Create the isolated canvas
      const canvas = await createIsolatedCanvas();
      
      // Verify container still exists after async operation
      if (!containerRef.current) {
        console.warn('Container disappeared during canvas creation');
        return;
      }

      // Append canvas to container
      containerRef.current.appendChild(canvas);
      
      // Wait one more frame to ensure canvas is properly attached
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Verify canvas is properly attached and visible
      if (!document.contains(canvas) || !containerRef.current.contains(canvas)) {
        throw new Error('Canvas failed to attach to container');
      }

      // Initialize Three.js scene manager
      const sceneManager = new EcoSceneManager(canvas, handleWebGLUnsupported);
      
      // Store global instance
      globalCanvasInstance = {
        id: componentIdRef.current,
        canvas,
        sceneManager,
        container: containerRef.current
      };
      
      // Initialize and start animation
      sceneManager.init();
      sceneManager.animate();
      
      setIsInitialized(true);
      console.log('WebGL scene initialized successfully');

    } catch (error) {
      console.error('Failed to initialize WebGL scene:', error);
      handleWebGLUnsupported();
    }
  }, [testWebGLSupport, handleWebGLUnsupported, createIsolatedCanvas]);

  // Initialize the WebGL scene
  useEffect(() => {
    let mounted = true;

    // Use a longer delay to ensure everything else has fully mounted
    const initTimeout = setTimeout(() => {
      if (mounted && !isWebGLUnsupported) {
        initializeWebGLScene();
      }
    }, 500); // Increased delay for maximum isolation

    return () => {
      mounted = false;
      clearTimeout(initTimeout);
    };
  }, [initializeWebGLScene, isWebGLUnsupported]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Only clean up if this component created the global instance
      if (globalCanvasInstance && globalCanvasInstance.id === componentIdRef.current) {
        console.log('Cleaning up WebGL scene on unmount');
        try {
          globalCanvasInstance.sceneManager.cleanup();
          if (document.contains(globalCanvasInstance.canvas)) {
            globalCanvasInstance.container.removeChild(globalCanvasInstance.canvas);
          }
        } catch (error) {
          console.warn('Error during cleanup:', error);
        }
        globalCanvasInstance = null;
      }
    };
  }, []);

  // Handle scene transitions based on location
  useEffect(() => {
    if (!isInitialized || !globalCanvasInstance) return;

    const hash = location.hash.slice(1); // remove '#'
    let key: SceneKey = 'about'; // default scene
    let co2Metric = 50; // default CO₂ metric

    // Import roadmap data to get CO₂ metrics
    import('../helpers/roadmapData').then(({ roadmapData }) => {
      // Find the current section's CO₂ metric
      for (const section of roadmapData) {
        if (section.slug === `/#${hash}`) {
          co2Metric = section.co2Saved || 50;
          break;
        }
        if (section.subNodes) {
          for (const subNode of section.subNodes) {
            if (subNode.slug === `/#${hash}`) {
              co2Metric = subNode.co2Saved || 50;
              break;
            }
          }
        }
      }

      // Map URL hash to scene key
      if (hash.includes('project') || hash.includes('work') || hash.includes('case')) {
        key = 'projects';
      } else if (hash.includes('impact')) {
        key = 'impact-metrics';
      } else if (hash.includes('skill')) {
        key = 'skills';
      } else if (hash.includes('blog') || hash.includes('publication')) {
        key = 'blog';
      } else if (hash.includes('contact')) {
        key = 'contact';
      }

      if (globalCanvasInstance) {
        globalCanvasInstance.sceneManager.transitionTo(key, co2Metric);
      }
    }).catch(error => {
      console.warn('Failed to load roadmap data:', error);
    });
  }, [location.hash, isInitialized]);

  if (isWebGLUnsupported) {
    return (
      <div className={`${styles.canvasContainer} ${styles.fallback}`} data-eco-canvas="fallback">
        {/* A simple static SVG fallback representing a stylized landscape */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'var(--secondary)', stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: 'var(--background)', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#skyGradient)" />
          <path d="M -5,70 Q 25,50 50,75 T 105,70 L 105,105 L -5,105 Z" fill="url(#groundGradient)" />
          <circle cx="20" cy="65" r="8" fill="var(--primary)" opacity="0.6" />
          <circle cx="80" cy="68" r="12" fill="var(--primary)" opacity="0.7" />
          <circle cx="55" cy="72" r="10" fill="var(--primary)" opacity="0.5" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={styles.canvasContainer} 
      data-eco-canvas="webgl"
      data-component-id={componentIdRef.current}
    />
  );
};