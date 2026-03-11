import React from 'react';
import { Sphere, Edges } from '@react-three/drei';
import * as THREE from 'three';

export const SphereShape = ({ length, unwrap, opacity, showFaces, showEdges }) => {
    const r = length / 2;
    const u = unwrap / 100;

    const matProps = {
        transparent: true,
        opacity: opacity / 100,
        side: THREE.FrontSide,
        depthWrite: false,
        color: '#3b82f6'
    };

    return (
        <group>
            {/* Top Hemisphere */}
            <group position={[0, u * r * 0.5, 0]} rotation={[u * Math.PI / 4, 0, 0]}>
                <Sphere args={[r, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} visible={showFaces}>
                    <meshStandardMaterial {...matProps} />
                    {showEdges && <Edges threshold={20} color="#06b6d4" transparent opacity={opacity / 100} />}
                </Sphere>
            </group>

            {/* Bottom Hemisphere */}
            <group position={[0, -u * r * 0.5, 0]} rotation={[-u * Math.PI / 4, 0, 0]}>
                <Sphere args={[r, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} visible={showFaces}>
                    <meshStandardMaterial {...matProps} />
                    {showEdges && <Edges threshold={20} color="#06b6d4" transparent opacity={opacity / 100} />}
                </Sphere>
            </group>
        </group>
    );
};
