import React from 'react';
import { Cylinder, Edges } from '@react-three/drei';
import * as THREE from 'three';

export const CylinderShape = ({ radius, height, unwrap, opacity, showFaces, showEdges, showVertices }) => {
    const r = radius;
    const h = height;
    const u = unwrap / 100;

    const matProps = {
        transparent: true,
        opacity: opacity / 100,
        side: THREE.DoubleSide,
        depthWrite: false,
        color: '#8b5cf6'
    };

    const capMatProps = {
        ...matProps,
        color: '#be185d'
    };

    return (
        <group position={[0, 0, 0]}>
            {/* Side of the cylinder. We don't unroll it fully here, just a visual placeholder */}
            <Cylinder args={[r, r, h, 32, 1]} visible={showFaces}>
                <meshStandardMaterial {...matProps} />
                {showEdges && <Edges threshold={15} color="#06b6d4" transparent opacity={opacity / 100} />}
            </Cylinder>

            {/* Top Cap */}
            <group position={[0, h / 2, -r]} rotation={[-u * Math.PI / 1.5, 0, 0]}>
                <mesh position={[0, 0, r]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[r, 32]} />
                    <meshStandardMaterial {...capMatProps} visible={showFaces} />
                    {showEdges && <Edges color="#06b6d4" transparent opacity={opacity / 100} />}
                </mesh>
            </group>

            {/* Bottom Cap */}
            <group position={[0, -h / 2, -r]} rotation={[u * Math.PI / 1.5, 0, 0]}>
                <mesh position={[0, 0, r]} rotation={[Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[r, 32]} />
                    <meshStandardMaterial {...capMatProps} visible={showFaces} />
                    {showEdges && <Edges color="#06b6d4" transparent opacity={opacity / 100} />}
                </mesh>
            </group>
        </group>
    );
};
