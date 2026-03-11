import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const GenericMatProps = (opacity) => ({
    transparent: true,
    opacity: opacity / 100,
    side: THREE.DoubleSide,
    depthWrite: false,
});

export const TriangleShape = ({ length, height, opacity, showFaces, showEdges, showVertices }) => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -length / 2, -height / 2, 0,
        length / 2, -height / 2, 0,
        0, height / 2, 0
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();

    return (
        <group position={[0, 0, 0]}>
            <mesh>
                <primitive object={geom} attach="geometry" />
                <meshStandardMaterial color="#34d399" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && <Line points={[[-length / 2, -height / 2, 0], [length / 2, -height / 2, 0], [0, height / 2, 0], [-length / 2, -height / 2, 0]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />}
            {showVertices && (
                <>
                    {[[-length / 2, -height / 2, 0], [length / 2, -height / 2, 0], [0, height / 2, 0]].map((p, i) => (
                        <mesh position={p} key={i}>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshStandardMaterial color="#f43f5e" />
                        </mesh>
                    ))}
                </>
            )}
        </group>
    );
};

export const ParallelogramShape = ({ length, height, angle, opacity, showFaces, showEdges, showVertices }) => {
    const A = Math.max(10, Math.min(170, Number(angle) || 60));
    const rad = (A * Math.PI) / 180;
    const offset = height / Math.tan(rad);
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -length / 2 - offset / 2, -height / 2, 0,
        length / 2 - offset / 2, -height / 2, 0,
        -length / 2 + offset / 2, height / 2, 0,
        length / 2 - offset / 2, -height / 2, 0,
        length / 2 + offset / 2, height / 2, 0,
        -length / 2 + offset / 2, height / 2, 0,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    const P = [
        [-length / 2 - offset / 2, -height / 2, 0],
        [length / 2 - offset / 2, -height / 2, 0],
        [length / 2 + offset / 2, height / 2, 0],
        [-length / 2 + offset / 2, height / 2, 0]
    ];

    return (
        <group>
            <mesh>
                <primitive object={geom} attach="geometry" />
                <meshStandardMaterial color="#c084fc" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && <Line points={[...P, P[0]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />}
            {showVertices && P.map((p, i) => (
                <mesh position={p} key={i}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#f43f5e" />
                </mesh>
            ))}
        </group>
    );
};

export const RhombusShape = ({ length, angle, opacity, showFaces, showEdges, showVertices }) => {
    const A = Math.max(10, Math.min(170, Number(angle) || 60));
    const rad = (A * Math.PI) / 180;
    // For a rhombus, all sides are equal to 'length'. 
    const h = length * Math.sin(rad);
    const offset = length * Math.cos(rad);
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -length / 2 - offset / 2, -h / 2, 0,
        length / 2 - offset / 2, -h / 2, 0,
        -length / 2 + offset / 2, h / 2, 0,
        length / 2 - offset / 2, -h / 2, 0,
        length / 2 + offset / 2, h / 2, 0,
        -length / 2 + offset / 2, h / 2, 0,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();

    const P = [
        [-length / 2 - offset / 2, -h / 2, 0],
        [length / 2 - offset / 2, -h / 2, 0],
        [length / 2 + offset / 2, h / 2, 0],
        [-length / 2 + offset / 2, h / 2, 0]
    ];

    return (
        <group>
            <mesh>
                <primitive object={geom} attach="geometry" />
                <meshStandardMaterial color="#fb923c" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && <Line points={[...P, P[0]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />}
            {showVertices && P.map((p, i) => (
                <mesh position={p} key={i}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#f43f5e" />
                </mesh>
            ))}
        </group>
    );
};

export const TrapezoidShape = ({ length, height, opacity, showFaces, showEdges, showVertices }) => {
    const topLength = length * 0.5; // Top width is half
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -length / 2, -height / 2, 0,
        length / 2, -height / 2, 0,
        -topLength / 2, height / 2, 0,
        length / 2, -height / 2, 0,
        topLength / 2, height / 2, 0,
        -topLength / 2, height / 2, 0,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    const P = [
        [-length / 2, -height / 2, 0],
        [length / 2, -height / 2, 0],
        [topLength / 2, height / 2, 0],
        [-topLength / 2, height / 2, 0],
    ];

    return (
        <group>
            <mesh>
                <primitive object={geom} attach="geometry" />
                <meshStandardMaterial color="#60a5fa" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && <Line points={[...P, P[0]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />}
            {showVertices && P.map((p, i) => (
                <mesh position={p} key={i}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#f43f5e" />
                </mesh>
            ))}
        </group>
    );
};

export const PolygonShape = ({ sides, radius, color, opacity, showFaces, showEdges, showVertices }) => {
    const r = radius;
    return (
        <group>
            <mesh>
                <circleGeometry args={[r, sides]} />
                <meshStandardMaterial color={color || "#22d3ee"} {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && (
                <mesh position={[0, 0, 0.01]}>
                    <ringGeometry args={[r - 0.05, r, sides]} />
                    <meshBasicMaterial color="#06b6d4" transparent opacity={opacity / 100} />
                </mesh>
            )}
            {showVertices && (
                <group>
                    {Array.from({ length: sides }).map((_, i) => {
                        const theta = (i / sides) * Math.PI * 2 + Math.PI / 2 + (sides % 2 === 0 ? Math.PI / sides : 0);
                        return (
                            <mesh position={[r * Math.cos(theta), r * Math.sin(theta), 0]} key={i}>
                                <sphereGeometry args={[0.2, 16, 16]} />
                                <meshStandardMaterial color="#f43f5e" />
                            </mesh>
                        )
                    })}
                </group>
            )}
        </group>
    );
};

export const CircleShape = ({ radius, opacity, showFaces, showEdges, showVertices }) => {
    const r = radius;
    return (
        <group>
            <mesh>
                <circleGeometry args={[r, 64]} />
                <meshStandardMaterial color="#f472b6" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && (
                <mesh position={[0, 0, 0.01]}>
                    <ringGeometry args={[r - 0.05, r, 64]} />
                    <meshBasicMaterial color="#06b6d4" transparent opacity={opacity / 100} />
                </mesh>
            )}
            {showVertices && (
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#f43f5e" />
                </mesh>
            )}
        </group>
    );
};

export const SectorShape = ({ radius, angle, opacity, showFaces, showEdges, showVertices }) => {
    const r = radius;
    const rad = (Math.max(10, Math.min(360, Number(angle) || 60)) * Math.PI) / 180;

    // Rotate to make it face up like a pie slightly
    const thetaStart = Math.PI / 2 - rad / 2;

    return (
        <group>
            <mesh>
                <circleGeometry args={[r, 64, thetaStart, rad]} />
                <meshStandardMaterial color="#ef4444" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && (
                <mesh position={[0, 0, 0.01]}>
                    <ringGeometry args={[r - 0.05, r, 64, 1, thetaStart, rad]} />
                    <meshBasicMaterial color="#06b6d4" transparent opacity={opacity / 100} />
                </mesh>
            )}
            {/* Outline bounds (the two straight edges) */}
            {showEdges && (
                <>
                    <Line points={[[0, 0, 0.01], [r * Math.cos(thetaStart), r * Math.sin(thetaStart), 0.01]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />
                    <Line points={[[0, 0, 0.01], [r * Math.cos(thetaStart + rad), r * Math.sin(thetaStart + rad), 0.01]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />
                </>
            )}
            {showVertices && (
                <>
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#f43f5e" />
                    </mesh>
                    <mesh position={[r * Math.cos(thetaStart), r * Math.sin(thetaStart), 0]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial color="#f43f5e" />
                    </mesh>
                    <mesh position={[r * Math.cos(thetaStart + rad), r * Math.sin(thetaStart + rad), 0]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial color="#f43f5e" />
                    </mesh>
                </>
            )}
        </group>
    );
};

export const QuadrilateralShape = ({ length, height, opacity, showFaces, showEdges, showVertices }) => {
    return (
        <group>
            <mesh>
                <planeGeometry args={[length, height]} />
                <meshStandardMaterial color="#fcd34d" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {showEdges && <Line points={[[-length / 2, -height / 2, 0], [length / 2, -height / 2, 0], [length / 2, height / 2, 0], [-length / 2, height / 2, 0], [-length / 2, -height / 2, 0]]} color="#06b6d4" lineWidth={2} transparent opacity={opacity / 100} />}
            {showVertices && (
                <>
                    {[[-length / 2, -height / 2, 0], [length / 2, -height / 2, 0], [length / 2, height / 2, 0], [-length / 2, height / 2, 0]].map((p, i) => (
                        <mesh position={p} key={i}>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshStandardMaterial color="#f43f5e" />
                        </mesh>
                    ))}
                </>
            )}
        </group>
    );
};
