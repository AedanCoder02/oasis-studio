// --- src/liquid-chrome.js ---
// Vanilla JS implementation of the LiquidChrome WebGL Component using OGL
// All 5 palette colors are displayed simultaneously via spatial mapping
import { Renderer, Program, Mesh, Triangle } from 'ogl';

// Helper to convert hex to normalized RGB array 0-1
function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

export function initLiquidChrome(container, {
  baseColors = ['#2a2a2e', '#6b6b70', '#c4a882', '#d9c4a8', '#e8d5bf'],
  speed = 0.2,
  amplitude = 0.3,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
} = {}) {
  const renderer = new Renderer({ antialias: true, alpha: false });
  const gl = renderer.gl;
  gl.clearColor(0.04, 0.04, 0.05, 1);

  const vertexShader = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  // Use 5 individual vec3 uniforms (OGL doesn't support vec3 arrays via flat Float32Array)
  const fragmentShader = `
    precision highp float;
    uniform float uTime;
    uniform vec3 uResolution;
    uniform vec3 uC0;
    uniform vec3 uC1;
    uniform vec3 uC2;
    uniform vec3 uC3;
    uniform vec3 uC4;
    uniform float uAmplitude;
    uniform float uFrequencyX;
    uniform float uFrequencyY;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Smoothly interpolate across 5 colors based on a 0..1 value
    vec3 getPaletteColor(float t) {
        float s = clamp(t, 0.0, 1.0) * 4.0;
        vec3 color = mix(uC0, uC1, smoothstep(0.0, 1.0, clamp(s, 0.0, 1.0)));
        color = mix(color, uC2, smoothstep(0.0, 1.0, clamp(s - 1.0, 0.0, 1.0)));
        color = mix(color, uC3, smoothstep(0.0, 1.0, clamp(s - 2.0, 0.0, 1.0)));
        color = mix(color, uC4, smoothstep(0.0, 1.0, clamp(s - 3.0, 0.0, 1.0)));
        return color;
    }

    vec4 renderImage(vec2 uvCoord) {
        vec2 fragCoord = uvCoord * uResolution.xy;
        vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

        // Global flowing waves (unchanged by mouse)
        for (float i = 1.0; i < 10.0; i++){
            uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime);
            uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime);
        }

        // Localized liquid surface displacement (Finger trail)
        vec2 diff = (uvCoord - uMouse);
        float dist = length(diff);
        float falloff = exp(-dist * 6.0);
        float ripple = sin(20.0 * dist - uTime * 8.0) * 0.15;
        uv += (diff / (dist + 0.0001)) * ripple * falloff;

        // Map spatial coordinates + time to palette (all colors visible simultaneously)
        float spatialT = (sin(uv.x * 2.0 + uTime * 0.3) + cos(uv.y * 2.0 + uTime * 0.5)) * 0.5 + 0.5;
        vec3 paletteColor = getPaletteColor(spatialT);

        // Dark base with palette as subtle liquid accents — NO white
        vec3 darkBase = vec3(0.06, 0.06, 0.07);
        float pattern = abs(sin(uTime - uv.y - uv.x));
        // Mix: dark when pattern is low, palette color when pattern is high
        vec3 color = mix(darkBase, paletteColor * 0.85, pattern);
        return vec4(color, 1.0);
    }

    void main() {
        gl_FragColor = renderImage(vUv);
    }
  `;

  // Convert hex colors to RGB arrays
  const c0 = hexToRGB(baseColors[0]);
  const c1 = hexToRGB(baseColors[1]);
  const c2 = hexToRGB(baseColors[2]);
  const c3 = hexToRGB(baseColors[3]);
  const c4 = hexToRGB(baseColors[4]);

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: {
        value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
      },
      uC0: { value: new Float32Array(c0) },
      uC1: { value: new Float32Array(c1) },
      uC2: { value: new Float32Array(c2) },
      uC3: { value: new Float32Array(c3) },
      uC4: { value: new Float32Array(c4) },
      uAmplitude: { value: amplitude },
      uFrequencyX: { value: frequencyX },
      uFrequencyY: { value: frequencyY },
      uMouse: { value: new Float32Array([0.5, 0.5]) }
    }
  });

  const mesh = new Mesh(gl, { geometry, program });

  function resize() {
    const scale = 1;
    renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);
    const resUniform = program.uniforms.uResolution.value;
    resUniform[0] = gl.canvas.width;
    resUniform[1] = gl.canvas.height;
    resUniform[2] = gl.canvas.width / gl.canvas.height;
  }
  window.addEventListener('resize', resize);
  resize();

  let currentX = 0.5;
  let currentY = 0.5;
  let targetX = 0.5;
  let targetY = 0.5;

  function handleMouseMove(event) {
    targetX = event.clientX / Math.max(1, window.innerWidth);
    targetY = 1.0 - (event.clientY / Math.max(1, window.innerHeight));
  }

  function handleTouchMove(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      targetX = touch.clientX / Math.max(1, window.innerWidth);
      targetY = 1.0 - (touch.clientY / Math.max(1, window.innerHeight));
    }
  }

  if (interactive) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
  }

  let animationId;
  function update(t) {
    animationId = requestAnimationFrame(update);
    program.uniforms.uTime.value = t * 0.001 * speed;

    // Smooth physics lerp for mouse (creates momentum wake)
    currentX += (targetX - currentX) * 0.035;
    currentY += (targetY - currentY) * 0.035;
    program.uniforms.uMouse.value[0] = currentX;
    program.uniforms.uMouse.value[1] = currentY;

    renderer.render({ scene: mesh });
  }
  animationId = requestAnimationFrame(update);

  // CSS fallback gradient in case WebGL doesn't render
  container.style.background = `linear-gradient(135deg, ${baseColors[0]}, ${baseColors[2]}, ${baseColors[1]}, ${baseColors[3]}, ${baseColors[4]})`;
  container.style.backgroundSize = '400% 400%';

  if (container.style.position === 'static' || !container.style.position) {
    container.style.position = 'relative';
  }

  gl.canvas.style.position = 'absolute';
  gl.canvas.style.top = '0';
  gl.canvas.style.left = '0';
  gl.canvas.style.width = '100%';
  gl.canvas.style.height = '100%';
  gl.canvas.style.pointerEvents = 'none';
  container.appendChild(gl.canvas);

  return function destroy() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    if (interactive) {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    }
    if (gl.canvas.parentElement) {
      gl.canvas.parentElement.removeChild(gl.canvas);
    }
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
  };
}
