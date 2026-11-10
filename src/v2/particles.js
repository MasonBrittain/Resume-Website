// The particle field behind the page: three ribbons of points drawn with
// WebGL. Every point's position, size, and colour is computed on the GPU from
// its (u, v, ribbon) coordinates and a handful of uniforms, so the CPU only
// eases a few numbers per frame.

const VERTEX = `
attribute vec3 a; // u along the ribbon, v across it, ribbon index
uniform float t, aspect, dpr, reveal, glow, drift;
uniform vec2 mouse;
uniform vec4 quiet; // a screen rect (clip space) the field fades out of
varying vec3 col;
varying float alpha;

void main() {
  float u = a.x, v = a.y, k = a.z;

  // Ribbon 3 is the soft back layer: it follows the front ribbons' shape,
  // but wider, slower, and drawn with larger, fainter points.
  float back = step(2.5, k);
  float kk = mix(k, 0.6, back);
  float ph = t * mix(1.0, 0.55, back) + drift * mix(1.4, 0.8, back);

  // Each ribbon rises from lower left; the third branch falls away to the right.
  float x = mix(-1.25, 1.2, u);
  // The falling branch (ribbon 2) sinks low enough to run behind the project strip.
  float endY = mix(0.6, -0.42, kk * 0.5) - step(1.5, kk) * 0.32 + back * 0.08;
  float y = mix(-0.42, endY, smoothstep(0.05, 1.0, u));
  y += 0.13 * sin(u * 3.0 + ph * 0.32 + kk * 1.9) + 0.06 * sin(u * 7.1 - ph * 0.47 + kk * 1.3);

  // Width and twist turn a line of points into a folding sheet.
  float twist = u * 4.2 + ph * 0.27 + kk * 2.3;
  float w = (0.26 + 0.16 * sin(u * 2.2 + ph * 0.21 + kk * 0.8)) * smoothstep(-0.1, 0.55, u) * mix(1.0, 2.4, back);
  float off = (v - 0.5) * w;
  y += off * cos(twist);
  float depth = off * sin(twist) / max(w, 0.001);
  y += 0.010 * sin(v * 42.0 + u * 27.0 + ph * 1.1);

  // The field parts around the cursor.
  vec2 p = vec2(x, y);
  vec2 d = (p - mouse) * vec2(aspect, 1.0);
  float r2 = dot(d, d);
  p += normalize(d + 1e-4) / vec2(aspect, 1.0) * 0.07 * exp(-r2 * 16.0);

  gl_Position = vec4(p, 0.0, 1.0);
  gl_PointSize = mix(1.2 + (depth + 0.5) * 1.8, 3.2 + (depth + 0.5) * 1.6, back) * dpr;

  vec3 indigo = vec3(0.353, 0.176, 1.0);
  vec3 magenta = vec3(1.0, 0.31, 0.847);
  vec3 lavender = vec3(0.78, 0.74, 1.0);
  col = mix(indigo, magenta, min(1.0, smoothstep(0.35, 0.85, u) * (0.25 + 0.4 * kk)));
  col = mix(col, lavender, smoothstep(0.25, 0.5, depth) * 0.45);

  float edge = 1.0 - pow(abs(v - 0.5) * 2.0, 3.0);
  alpha = mix((0.2 + 0.42 * (depth + 0.5)) * edge, 0.075 * edge, back);
  alpha *= mix(0.22, 1.0, smoothstep(-0.55, 0.25, x));    // quiet behind the name
  alpha *= 1.0 + 0.45 * kk * smoothstep(0.5, 1.0, u);     // the falling branch runs hot
  alpha *= 0.65 + 0.7 * exp(-r2 * 10.0);                  // brighter near the cursor
  alpha *= 1.0 - smoothstep(reveal * 1.25 - 0.15, reveal * 1.25, u); // streams in on load
  alpha *= glow;

  // Text that sits over the field gets clear air instead of a scrim.
  vec2 qc = (quiet.xy + quiet.zw) * 0.5;
  vec2 qh = (quiet.zw - quiet.xy) * 0.5;
  vec2 q = abs((p - qc) * vec2(aspect, 1.0)) - qh * vec2(aspect, 1.0);
  float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  alpha *= mix(0.08, 1.0, smoothstep(0.0, 0.14, sd));
}`;

const FRAGMENT = `
precision mediump float;
varying vec3 col;
varying float alpha;
void main() {
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  gl_FragColor = vec4(col, alpha * (1.0 - r * 2.0));
}`;

const OFF = 2; // a cursor position far outside clip space: no parting
const NO_QUIET = [9, 9, 9, 9]; // a quiet rect far outside clip space

export function createField(canvas, { reducedMotion = false } = {}) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return null;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // Fewer points on small or low-core devices; the look holds, the cost drops.
  const light = Math.min(window.innerWidth, window.innerHeight) < 700 || (navigator.hardwareConcurrency || 8) <= 4;
  const U = light ? 420 : 760;
  const V = light ? 40 : 56;
  const R = 4; // three front ribbons and one soft back layer
  const count = U * V * R;
  const points = new Float32Array(count * 3);
  let i = 0;
  for (let k = 0; k < R; k++) {
    for (let a = 0; a < U; a++) {
      for (let b = 0; b < V; b++) {
        points[i++] = a / (U - 1) + (Math.random() - 0.5) / U;
        points[i++] = b / (V - 1) + (Math.random() - 0.5) / V;
        points[i++] = k;
      }
    }
  }
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  const attr = gl.getAttribLocation(program, 'a');
  gl.enableVertexAttribArray(attr);
  gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.clearColor(0.075, 0.039, 0.165, 1);

  const loc = Object.fromEntries(
    ['t', 'aspect', 'dpr', 'reveal', 'glow', 'drift', 'mouse', 'quiet'].map((n) => [n, gl.getUniformLocation(program, n)])
  );

  const s = {
    glow: 0, glowTarget: 1,
    drift: 0, driftTarget: 0,
    mouse: [OFF, OFF], target: [OFF, OFF],
    quiet: NO_QUIET,
    w: 0, h: 0, dpr: 1,
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === s.w && h === s.h && dpr === s.dpr) return;
    Object.assign(s, { w, h, dpr });
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    requestDraw();
  };

  const start = performance.now();
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  const draw = (now) => {
    const ease = reducedMotion ? 1 : 0.08;
    s.glow += (s.glowTarget - s.glow) * ease;
    s.drift += (s.driftTarget - s.drift) * (reducedMotion ? 1 : 0.1);
    s.mouse[0] += (s.target[0] - s.mouse[0]) * ease;
    s.mouse[1] += (s.target[1] - s.mouse[1]) * ease;
    const reveal = reducedMotion ? 1 : easeOut(Math.min(1, Math.max(0, (now - start - 150) / 1800)));
    const t = reducedMotion ? 14 : 14 + (now - start) / 1000;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(loc.t, t);
    gl.uniform1f(loc.aspect, s.w / Math.max(s.h, 1));
    gl.uniform1f(loc.dpr, s.dpr);
    gl.uniform1f(loc.reveal, reveal);
    gl.uniform1f(loc.glow, s.glow);
    gl.uniform1f(loc.drift, s.drift);
    gl.uniform2f(loc.mouse, s.mouse[0], s.mouse[1]);
    gl.uniform4f(loc.quiet, ...s.quiet);
    gl.drawArrays(gl.POINTS, 0, count);
  };

  // Reduced motion draws a still frame only when something changes;
  // otherwise the field runs continuously (the browser pauses hidden tabs).
  let raf = 0;
  let pending = false;
  function requestDraw() {
    if (!reducedMotion || pending) return;
    pending = true;
    raf = requestAnimationFrame((now) => {
      pending = false;
      draw(now);
    });
  }
  const loop = (now) => {
    draw(now);
    raf = requestAnimationFrame(loop);
  };

  const onMove = (e) => {
    if (e.pointerType === 'touch' || !s.w) return;
    s.target = [(e.clientX / s.w) * 2 - 1, 1 - (e.clientY / s.h) * 2];
  };
  const onLeave = () => {
    s.target = [OFF, OFF];
  };
  const onLost = (e) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
    canvas.style.visibility = 'hidden'; // the CSS ground underneath takes over
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  canvas.addEventListener('webglcontextlost', onLost);
  if (!reducedMotion) {
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
  }

  resize();
  if (reducedMotion) {
    s.glow = s.glowTarget;
    requestDraw();
  } else {
    raf = requestAnimationFrame(loop);
  }

  return {
    setGlow(value) {
      s.glowTarget = value;
      requestDraw();
    },
    setQuiet(rect) {
      s.quiet = rect || NO_QUIET;
      requestDraw();
    },
    setDrift(value) {
      s.driftTarget = reducedMotion ? 0 : value;
    },
    destroy() {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}
