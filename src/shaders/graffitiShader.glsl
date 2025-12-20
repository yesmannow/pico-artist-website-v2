// Graffiti Shader - Dynamic color mixing based on time and UV coordinates
// Used by LightingScene and RemixShader components

uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
varying vec2 vUv;

// Noise function for graffiti texture
float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Smooth noise interpolation
float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    // Base color mixing with time animation
    vec3 color = mix(u_color1, u_color2, sin(u_time + vUv.x * 10.0) * 0.5 + 0.5);

    // Add spray paint texture effect
    float spray = smoothNoise(vUv * 50.0 + u_time * 0.1);
    color += spray * 0.1;

    // Add drip effect
    float drip = smoothstep(0.3, 0.7, sin(vUv.x * 20.0 + u_time) * 0.5 + 0.5);
    drip *= smoothstep(0.0, 0.5, vUv.y);
    color = mix(color, u_color2, drip * 0.3);

    // Vignette effect
    vec2 center = vUv - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.5;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}

