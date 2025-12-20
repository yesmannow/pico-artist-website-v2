// Remix Shader - AI-driven color palette blending
// Receives colors from AI Visual Remix Engine

uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_accent;
uniform float u_beat;
varying vec2 vUv;

// Hash function for pseudo-random values
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// 2D noise
float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise2D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value;
}

void main() {
    vec2 uv = vUv;

    // Distort UV based on beat
    float beatWave = sin(u_time * 2.0 + uv.x * 10.0) * u_beat * 0.1;
    uv.y += beatWave;

    // Create flowing gradient
    float flow = fbm(uv * 3.0 + u_time * 0.2);

    // Mix colors based on flow and position
    vec3 color1Mix = mix(u_color1, u_color2, flow);
    vec3 color2Mix = mix(u_color2, u_accent, 1.0 - flow);

    // Final color blend
    float gradient = sin(uv.x * 6.28 + u_time) * 0.5 + 0.5;
    vec3 finalColor = mix(color1Mix, color2Mix, gradient);

    // Add pulsing highlight on beat
    float pulse = smoothstep(0.4, 0.6, u_beat);
    finalColor += u_accent * pulse * 0.3;

    // Add subtle grain
    float grain = hash(uv * 1000.0 + u_time) * 0.05;
    finalColor += grain;

    // Output with transparency
    float alpha = 0.7 + u_beat * 0.2;
    gl_FragColor = vec4(finalColor, alpha);
}

