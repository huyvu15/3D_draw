import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export const PyramidShape = ({ length, width, height, unwrap, opacity, showFaces, showEdges, showVertices }) => {
    const u = unwrap / 100;

    const matProps = {
        transparent: true,
        opacity: opacity / 100,
        side: THREE.DoubleSide,
        depthWrite: false,
    };

    // Base Plane
    const BasePlane = ({ w, d }) => (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w, d]} />
            <meshStandardMaterial color="#be185d" {...matProps} visible={showFaces} />
            {showEdges && <Line points={[[-w / 2, -d / 2, 0], [w / 2, -d / 2, 0], [w / 2, d / 2, 0], [-w / 2, d / 2, 0], [-w / 2, -d / 2, 0]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />}
            {showVertices && (
                <>
                    {[[-w / 2, -d / 2, 0], [w / 2, -d / 2, 0], [w / 2, d / 2, 0], [-w / 2, d / 2, 0]].map((p, i) => (
                        <mesh position={p} key={i}>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshStandardMaterial color="#f43f5e" />
                        </mesh>
                    ))}
                </>
            )}
        </mesh>
    );

    // Triangle Face
    const TriangleFace = ({ base, slantHeight, color }) => {
        const geom = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -base / 2, 0, 0,
            base / 2, 0, 0,
            0, slantHeight, 0
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();

        return (
            <group>
                <mesh>
                    <primitive object={geom} attach="geometry" />
                    <meshStandardMaterial color={color} {...matProps} visible={showFaces} />
                </mesh>
                {showEdges && <Line points={[[-base / 2, 0, 0], [base / 2, 0, 0], [0, slantHeight, 0], [-base / 2, 0, 0]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />}
            </group>
        );
    };

    // Calculate angles and slant heights
    const slantHeightFront = Math.hypot(width / 2, height);
    const slantHeightSide = Math.hypot(length / 2, height);

    const angleFront = Math.acos((width / 2) / slantHeightFront);
    const angleSide = Math.acos((length / 2) / slantHeightSide);

    // Interpolate rotations based on unwrap (0: folded up, 1: flat on ground)
    const currentRotFront = angleFront * (1 - u);
    const currentRotSide = angleSide * (1 - u);

    return (
        <group position={[0, -height / 2, 0]}>
            <BasePlane w={length} d={width} />

            {/* Front Face (positive Z) */}
            <group position={[0, 0, width / 2]} rotation={[-currentRotFront, 0, 0]}>
                <TriangleFace base={length} slantHeight={slantHeightFront} color="#1e3a8a" />
            </group>

            {/* Back Face (negative Z) */}
            <group position={[0, 0, -width / 2]} rotation={[currentRotFront, Math.PI, 0]}>
                <TriangleFace base={length} slantHeight={slantHeightFront} color="#1e3a8a" />
            </group>

            {/* Right Face (positive X) */}
            <group position={[length / 2, 0, 0]} rotation={[0, 0, currentRotSide]} rotation-y={Math.PI / 2}>
                <TriangleFace base={width} slantHeight={slantHeightSide} color="#8b5cf6" />
            </group>

            {/* Left Face (negative X) */}
            <group position={[-length / 2, 0, 0]} rotation={[0, 0, -currentRotSide]} rotation-y={-Math.PI / 2}>
                <TriangleFace base={width} slantHeight={slantHeightSide} color="#8b5cf6" />
            </group>

            {/* Apex Vertex */}
            {showVertices && (
                <mesh position={[0, height * (1 - u), 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#f43f5e" />
                </mesh>
            )}
        </group>
    );
};
