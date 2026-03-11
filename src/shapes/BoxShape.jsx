import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export const BoxShape = ({ length, width, height, unwrap, opacity, showFaces, showEdges, showVertices }) => {
    const w = length;
    const d = width;
    const h = height;
    const u = unwrap / 100;

    const faceColors = {
        front: '#1e3a8a',
        back: '#1e3a8a',
        left: '#8b5cf6',
        right: '#8b5cf6',
        top: '#be185d',
        bottom: '#be185d',
    };

    const matProps = {
        transparent: true,
        opacity: opacity / 100,
        side: THREE.DoubleSide,
        depthWrite: false,
    };

    const Plane = ({ w, h, rotation, color, position = [0, 0, 0] }) => (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={[w, h]} />
            <meshStandardMaterial color={color} {...matProps} visible={showFaces} />
        </mesh>
    );

    const EdgeGeometry = ({ w, h }) => {
        const points = [
            [-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [-w / 2, h / 2, 0], [-w / 2, -h / 2, 0],
        ];
        return <Line points={points} color="#06b6d4" lineWidth={2} visible={showEdges} transparent opacity={opacity / 100} />;
    };

    const Vertices = ({ w, h }) => {
        const points = [[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0], [w / 2, h / 2, 0], [-w / 2, h / 2, 0]];
        return (
            <>
                {points.map((p, i) => (
                    <mesh position={p} key={i} visible={showVertices}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial color="#f43f5e" />
                    </mesh>
                ))}
            </>
        );
    };

    const FaceWithBorders = ({ w, h, rotation, color, position = [0, 0, 0] }) => (
        <group position={position} rotation={rotation}>
            <Plane w={w} h={h} color={color} />
            <EdgeGeometry w={w} h={h} />
            <Vertices w={w} h={h} />
        </group>
    );

    return (
        <group position={[0, -h / 2, 0]}>
            <FaceWithBorders w={w} h={d} color={faceColors.bottom} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
            <group position={[0, 0, d / 2]}>
                <group rotation={[u * Math.PI / 2, 0, 0]}>
                    <FaceWithBorders w={w} h={h} color={faceColors.front} position={[0, h / 2, 0]} rotation={[0, 0, 0]} />
                </group>
            </group>
            <group position={[0, 0, -d / 2]}>
                <group rotation={[-u * Math.PI / 2, 0, 0]}>
                    <FaceWithBorders w={w} h={h} color={faceColors.back} position={[0, h / 2, 0]} rotation={[0, Math.PI, 0]} />
                    <group position={[0, h, 0]}>
                        <group rotation={[-u * Math.PI / 2, 0, 0]}>
                            <FaceWithBorders w={w} h={d} color={faceColors.top} position={[0, 0, d / 2]} rotation={[-Math.PI / 2, 0, 0]} />
                        </group>
                    </group>
                </group>
            </group>
            <group position={[-w / 2, 0, 0]}>
                <group rotation={[0, 0, -u * Math.PI / 2]}>
                    <FaceWithBorders w={d} h={h} color={faceColors.left} position={[0, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]} />
                </group>
            </group>
            <group position={[w / 2, 0, 0]}>
                <group rotation={[0, 0, u * Math.PI / 2]}>
                    <FaceWithBorders w={d} h={h} color={faceColors.right} position={[0, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} />
                </group>
            </group>
        </group>
    );
};
