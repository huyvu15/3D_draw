import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Volume2, Play, Pause, RotateCcw, Eye, Box, Cylinder, Hexagon, Triangle, Square, Circle } from 'lucide-react';

import { BoxShape } from './shapes/BoxShape';
import { PyramidShape } from './shapes/PyramidShape';
import { CylinderShape } from './shapes/CylinderShape';
import { SphereShape } from './shapes/SphereShape';
import { TriangleShape, QuadrilateralShape, CircleShape, ParallelogramShape, RhombusShape, TrapezoidShape, PolygonShape } from './shapes/FlatShapes';

export default function App() {
    const [activeShape, setActiveShape] = useState('box');
    const [opacity, setOpacity] = useState(80);
    const [length, setLength] = useState(4);
    const [width, setWidth] = useState(4);
    const [height, setHeight] = useState(4);
    const [unwrap, setUnwrap] = useState(0);

    const [showVertices, setShowVertices] = useState(true);
    const [showEdges, setShowEdges] = useState(true);
    const [showFaces, setShowFaces] = useState(true);
    const [showLabels, setShowLabels] = useState(false);

    const [activeTab, setActiveTab] = useState('khampha'); // khampha | thetich

    const shapeTitles = {
        cube: 'HÌNH LẬP PHƯƠNG', box: 'HÌNH HỘP CHỮ NHẬT', pyramid: 'HÌNH CHÓP TỨ GIÁC',
        cylinder: 'HÌNH TRỤ', sphere: 'HÌNH CẦU', triangle: 'HÌNH TAM GIÁC',
        quadrilateral: 'HÌNH TỨ GIÁC', circle: 'HÌNH TRÒN',
        parallelogram: 'HÌNH BÌNH HÀNH', rhombus: 'HÌNH THOI', trapezoid: 'HÌNH THANG',
        pentagon: 'NGŨ GIÁC', hexagon: 'LỤC GIÁC'
    };


    // Calculate volume and area
    let area = 0, volume = 0;
    const r = length / 2;
    if (activeShape === 'box' || activeShape === 'cube') {
        const d = activeShape === 'cube' ? length : width;
        const h = activeShape === 'cube' ? length : height;
        area = 2 * (length * d + d * h + h * length);
        volume = length * d * h;
    } else if (activeShape === 'pyramid') {
        const sx = Math.hypot(width / 2, height);
        const sz = Math.hypot(length / 2, height);
        area = length * width + length * sx + width * sz;
        volume = (length * width * height) / 3;
    } else if (activeShape === 'cylinder') {
        area = 2 * Math.PI * r * (r + height);
        volume = Math.PI * r * r * height;
    } else if (activeShape === 'sphere') {
        area = 4 * Math.PI * r * r;
        volume = (4 / 3) * Math.PI * r * r * r;
    } else if (activeShape === 'triangle') {
        area = (length * height) / 2;
    } else if (activeShape === 'quadrilateral' || activeShape === 'parallelogram' || activeShape === 'rhombus') {
        area = length * height;
    } else if (activeShape === 'trapezoid') {
        area = ((length + length * 0.5) * height) / 2; // Assuming top base is half of bottom base
    } else if (activeShape === 'circle') {
        area = Math.PI * r * r;
    } else if (activeShape === 'pentagon') {
        area = 5 * 0.5 * Math.pow(r, 2) * Math.sin((2 * Math.PI) / 5);
    } else if (activeShape === 'hexagon') {
        area = 6 * 0.5 * Math.pow(r, 2) * Math.sin((2 * Math.PI) / 6);
    }

    return (
        <div className="flex h-screen bg-[#0b1021] text-gray-200 font-sans">
            {/* Sidebar */}
            <aside className="w-80 bg-[#162035] flex flex-col p-4 shadow-xl z-10 overflow-y-auto border-r border-slate-700/50 relative">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                        <h1 className="font-bold text-lg text-white">Học Hình Học</h1>
                    </div>
                    <Volume2 size={20} className="text-gray-400 cursor-pointer hover:text-white" />
                </div>

                {/* Shape Selector Grid */}
                <div className="grid grid-cols-4 gap-2 mb-6 h-40 overflow-y-auto pr-1 select-none">
                    {[
                        { id: 'cube', label: 'LẬP PHƯƠNG', icon: <Hexagon size={20} className="mb-1 opacity-70" /> },
                        { id: 'box', label: 'HỘP', icon: <Box size={20} className="mb-1 opacity-70" /> },
                        { id: 'pyramid', label: 'CHÓP', icon: <Triangle size={20} className="mb-1 opacity-70" /> }, // Chóp
                        { id: 'cylinder', label: 'TRỤ', icon: <Cylinder size={20} className="mb-1 opacity-70" /> },
                        { id: 'sphere', label: 'CẦU', icon: <Circle size={20} className="mb-1 opacity-70" /> }, // Khối cầu
                        { id: 'triangle', label: 'TAM GIÁC', icon: <Triangle size={20} className="mb-1 opacity-70" /> },
                        { id: 'quadrilateral', label: 'TỨ GIÁC', icon: <Square size={20} className="mb-1 opacity-70" /> },
                        { id: 'parallelogram', label: 'BÌNH HÀNH', icon: <Square size={20} className="mb-1 opacity-70 -skew-x-12" /> },
                        { id: 'rhombus', label: 'THOI', icon: <Square size={20} className="mb-1 opacity-70 rotate-45" /> },
                        { id: 'trapezoid', label: 'THANG', icon: <Square size={20} className="mb-1 opacity-70" /> },
                        { id: 'pentagon', label: 'NGŨ GIÁC', icon: <Hexagon size={20} className="mb-1 opacity-70" /> },
                        { id: 'hexagon', label: 'LỤC GIÁC', icon: <Hexagon size={20} className="mb-1 opacity-70" /> },
                        { id: 'circle', label: 'TRÒN', icon: <Circle size={20} className="mb-1 opacity-70" /> },
                    ].map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveShape(s.id)}
                            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[10px] font-medium transition-colors ${activeShape === s.id ? 'bg-blue-600 border border-blue-400 text-white' : 'bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800'
                                }`}
                        >
                            {s.icon}
                            {s.label}
                        </button>
                    ))}
                </div>

                <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    {shapeTitles[activeShape]}
                </h2>

                {/* Toggles */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    <button onClick={() => setShowVertices(!showVertices)} className={`py-1.5 px-3 rounded text-xs font-semibold border flex items-center gap-2 ${showVertices ? 'bg-red-500/10 border-red-500 text-red-500' : 'border-gray-700 text-gray-500'}`}>
                        <span className="w-2 h-2 rounded-full bg-current"></span> ĐỈNH
                    </button>
                    <button onClick={() => setShowEdges(!showEdges)} className={`py-1.5 px-3 rounded text-xs font-semibold border flex items-center gap-2 ${showEdges ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'border-gray-700 text-gray-500'}`}>
                        <span className="w-3 h-[2px] bg-current"></span> CẠNH
                    </button>
                    <button onClick={() => setShowFaces(!showFaces)} className={`py-1.5 px-3 rounded text-xs font-semibold border flex items-center gap-2 ${showFaces ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'border-gray-700 text-gray-500'}`}>
                        <span className="w-3 h-3 bg-current opacity-80"></span> MẶT
                    </button>
                    <button onClick={() => setShowLabels(!showLabels)} className={`py-1.5 px-3 rounded text-xs font-semibold border flex items-center gap-2 ${showLabels ? 'bg-gray-500/10 border-gray-400 text-gray-300' : 'border-gray-700 text-gray-500'}`}>
                        T NHÃN
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex bg-[#0f172a] rounded-lg p-1 mb-6 border border-slate-700/50">
                    <button
                        className={`flex-1 text-xs py-1.5 rounded-md font-bold ${activeTab === 'khampha' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setActiveTab('khampha')}
                    >
                        KHÁM PHÁ
                    </button>
                    <button
                        className={`flex-1 text-xs py-1.5 rounded-md font-bold ${activeTab === 'thetich' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setActiveTab('thetich')}
                    >
                        THỂ TÍCH
                    </button>
                </div>

                {/* Sliders */}
                <div className="space-y-4 flex-1">
                    <div>
                        <div className="flex justify-between text-[11px] mb-1 text-gray-400">
                            <label>ĐỘ TRONG SUỐT: {opacity}%</label>
                        </div>
                        <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} className="w-full accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                        <div className="flex justify-between text-[11px] mb-1 text-gray-400">
                            <label>DÀI / CẠNH: {length}</label>
                        </div>
                        <input type="range" min="1" max="10" step="0.5" value={length} onChange={(e) => setLength(parseFloat(e.target.value))} className="w-full accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                        <div className="flex justify-between text-[11px] mb-1 text-gray-400">
                            <label>CHIỀU RỘNG: {width}</label>
                        </div>
                        <input type="range" min="1" max="10" step="0.5" value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} className="w-full accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                        <div className="flex justify-between text-[11px] mb-1 text-gray-400">
                            <label>CHIỀU CAO: {height}</label>
                        </div>
                        <input type="range" min="1" max="10" step="0.5" value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} className="w-full accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                        <div className="flex justify-between text-[11px] mb-1 text-yellow-500 font-medium">
                            <label>MỞ KHỐI / TRẢI HÌNH: {unwrap}%</label>
                        </div>
                        <input type="range" min="0" max="100" value={unwrap} onChange={(e) => setUnwrap(parseInt(e.target.value))} className="w-full accent-yellow-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>

                {/* Calculation Box */}
                <div className="mt-8 bg-[#0f172a] border border-blue-900/50 rounded-lg p-4">
                    <h3 className="text-xs text-gray-400 mb-3 font-semibold flex items-center gap-2">
                        <span className="font-mono text-[10px] border border-gray-600 px-1 rounded">1/2</span> THÔNG SỐ TÍNH TOÁN
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-400">DIỆN TÍCH:</span>
                        <div className="text-right">
                            <span className="text-green-500 font-mono text-lg">{area.toFixed(1)}</span> <span className="text-[10px] text-green-700">đvdt</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-400">THỂ TÍCH:</span>
                        <div className="text-right">
                            <span className="text-purple-500 font-mono text-lg">{volume.toFixed(1)}</span> <span className="text-[10px] text-purple-700">đvtt</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Canvas View */}
            <main className="flex-1 relative">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700 text-blue-300 font-bold px-6 py-2 rounded-full z-10 shadow-lg tracking-widest text-sm">
                    {shapeTitles[activeShape]}
                </div>

                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg">
                        <Pause size={18} fill="currentColor" />
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg shadow-lg">
                        <RotateCcw size={18} />
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg shadow-lg">
                        <Eye size={18} />
                    </button>
                </div>

                <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
                    <color attach="background" args={['#0a0f1d']} />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <directionalLight position={[-10, 10, -5]} intensity={0.5} />

                    {/* Base Grid */}
                    <Grid infiniteGrid fadeDistance={40} cellColor="#334155" sectionColor="#475569" />

                    {activeShape === 'box' && <BoxShape length={length} width={width} height={height} unwrap={unwrap} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'cube' && <BoxShape length={length} width={length} height={length} unwrap={unwrap} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'pyramid' && <PyramidShape length={length} width={width} height={height} unwrap={unwrap} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'cylinder' && <CylinderShape length={length} width={width} height={height} unwrap={unwrap} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'sphere' && <SphereShape length={length} width={width} height={height} unwrap={unwrap} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'triangle' && <TriangleShape length={length} width={width} height={height} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'quadrilateral' && <QuadrilateralShape length={length} width={width} height={height} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'parallelogram' && <ParallelogramShape length={length} width={width} height={height} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'rhombus' && <RhombusShape length={length} width={width} height={height} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'trapezoid' && <TrapezoidShape length={length} width={width} height={height} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'pentagon' && <PolygonShape sides={5} length={length} color="#a78bfa" opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'hexagon' && <PolygonShape sides={6} length={length} color="#34d399" opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}
                    {activeShape === 'circle' && <CircleShape length={length} width={width} height={height} opacity={opacity} showVertices={showVertices} showEdges={showEdges} showFaces={showFaces} />}

                    <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} />
                </Canvas>
            </main>
        </div>
    );
}
