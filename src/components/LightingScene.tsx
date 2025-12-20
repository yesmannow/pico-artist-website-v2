"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import * as THREE from "three";

// Animated point light that reacts to beat
function BeatReactiveLight() {
	const lightRef = useRef<THREE.PointLight>(null);
	const [intensity, setIntensity] = useState(2);
	const [hue, setHue] = useState(0.9);

	useEffect(() => {
		const handler = (e: CustomEvent<number>) => {
			setIntensity(1.5 + e.detail * 3);
			setHue(Math.random());
		};
		window.addEventListener("beat", handler as EventListener);
		window.addEventListener("live-beat", handler as EventListener);
		return () => {
			window.removeEventListener("beat", handler as EventListener);
			window.removeEventListener("live-beat", handler as EventListener);
		};
	}, []);

	useFrame((state) => {
		if (!lightRef.current) return;
		// Animate light position in a circle
		const t = state.clock.elapsedTime;
		lightRef.current.position.x = Math.sin(t * 0.5) * 3;
		lightRef.current.position.y = Math.cos(t * 0.3) * 2 + 1;
		lightRef.current.position.z = Math.cos(t * 0.5) * 3;
		lightRef.current.intensity = intensity;
		lightRef.current.color.setHSL(hue, 1, 0.5);
	});

	return <pointLight ref={lightRef} position={[2, 2, 2]} intensity={intensity} color="#ff00aa" castShadow />;
}

// Secondary accent light
function AccentLight() {
	const lightRef = useRef<THREE.PointLight>(null);

	useFrame((state) => {
		if (!lightRef.current) return;
		const t = state.clock.elapsedTime;
		lightRef.current.position.x = Math.cos(t * 0.4) * 4;
		lightRef.current.position.z = Math.sin(t * 0.4) * 4;
	});

	return <pointLight ref={lightRef} position={[-3, 1, 2]} intensity={1} color="#00ffff" />;
}

// Graffiti wall shader mesh
function GraffitiWall() {
	const meshRef = useRef<THREE.Mesh>(null);
	const uniformsRef = useRef({
		u_time: { value: 0 },
		u_color1: { value: new THREE.Color("#e91e63") },
		u_color2: { value: new THREE.Color("#9c27b0") },
	});

	// Listen for remix palette changes
	useEffect(() => {
		const handler = (e: CustomEvent<{ primary: string; secondary: string }>) => {
			if (e.detail?.primary) {
				uniformsRef.current.u_color1.value = new THREE.Color(e.detail.primary);
			}
			if (e.detail?.secondary) {
				uniformsRef.current.u_color2.value = new THREE.Color(e.detail.secondary);
			}
		};
		window.addEventListener("remix-palette", handler as EventListener);
		return () => window.removeEventListener("remix-palette", handler as EventListener);
	}, []);

	useFrame((state) => {
		uniformsRef.current.u_time.value = state.clock.elapsedTime;
	});

	const vertexShader = `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	const fragmentShader = `
		uniform float u_time;
		uniform vec3 u_color1;
		uniform vec3 u_color2;
		varying vec2 vUv;

		void main() {
			vec3 color = mix(u_color1, u_color2, sin(u_time + vUv.x * 10.0) * 0.5 + 0.5);
			float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
			color += noise * 0.05;
			gl_FragColor = vec4(color, 0.6);
		}
	`;

	return (
		<mesh ref={meshRef} position={[0, 0, -3]} rotation={[0, 0, 0]}>
			<planeGeometry args={[12, 6]} />
			<shaderMaterial
				uniforms={uniformsRef.current}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				transparent
				blending={THREE.AdditiveBlending}
			/>
		</mesh>
	);
}

// Floating particles
function FloatingParticles() {
	const pointsRef = useRef<THREE.Points>(null);
	const particleCount = 100;

	const positions = useMemo(() => {
		const pos = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount * 3; i += 3) {
			pos[i] = (Math.random() - 0.5) * 10;
			pos[i + 1] = (Math.random() - 0.5) * 10;
			pos[i + 2] = (Math.random() - 0.5) * 10;
		}
		return pos;
	}, []);

	useFrame((state) => {
		if (!pointsRef.current) return;
		pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
		pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={particleCount}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial size={0.05} color="#ff00aa" transparent opacity={0.6} sizeAttenuation />
		</points>
	);
}

export default function LightingScene() {
	return (
		<div className="fixed inset-0 -z-10 pointer-events-none">
			<Canvas
				camera={{ position: [0, 0, 6], fov: 60 }}
				gl={{ alpha: true, antialias: true }}
				style={{ background: "transparent" }}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={0.2} />
					<BeatReactiveLight />
					<AccentLight />
					<GraffitiWall />
					<FloatingParticles />
					<mesh position={[0, 0, -4]} rotation={[0, 0, 0]}>
						<planeGeometry args={[14, 8]} />
						<meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} />
					</mesh>
					<Environment preset="city" background={false} />
					<OrbitControls
						enableZoom={false}
						enablePan={false}
						enableRotate={false}
						autoRotate
						autoRotateSpeed={0.3}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
