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

export const ParallelogramShape = ({ length, height, opacity, showFaces, showEdges, showVertices }) => {
    const offset = height / 2; // Fixed slant
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -length / 2 - offset, -height / 2, 0,
        length / 2 - offset, -height / 2, 0,
        -length / 2 + offset, height / 2, 0,
        length / 2 - offset, -height / 2, 0,
        length / 2 + offset, height / 2, 0,
        -length / 2 + offset, height / 2, 0,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    const P = [
        [-length / 2 - offset, -height / 2, 0],
        [length / 2 - offset, -height / 2, 0],
        [length / 2 + offset, height / 2, 0],
        [-length / 2 + offset, height / 2, 0]
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

export const RhombusShape = ({ length, height, opacity, showFaces, showEdges, showVertices }) => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -length / 2, 0, 0,
        0, -height / 2, 0,
        0, height / 2, 0,
        0, -height / 2, 0,
        length / 2, 0, 0,
        0, height / 2, 0,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();

    const P = [
        [0, height / 2, 0],
        [length / 2, 0, 0],
        [0, -height / 2, 0],
        [-length / 2, 0, 0],
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

export const PolygonShape = ({ sides, length, color, opacity, showFaces, showEdges, showVertices }) => {
    const r = length / 2;
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
                        const theta = (i / sides) * Math.PI * 2 + (sides % 2 === 0 ? Math.PI / sides : 0);
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

export const CircleShape = ({ length, opacity, showFaces, showEdges, showVertices }) => {
    const r = length / 2;
    return (
        <group>
            <mesh>
                <circleGeometry args={[r, 64]} />
                <meshStandardMaterial color="#f472b6" {...GenericMatProps(opacity)} visible={showFaces} />
            </mesh>
            {/* Edges representation for circle is just an arc border. Using RingGeometry can do that, or Path */}
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
