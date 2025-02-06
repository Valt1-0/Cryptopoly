import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaEthereum } from "react-icons/fa";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.2} />;
};

const Card = ({ title, modelPath, price }) => {
  return (
    <div className="relative w-96 h-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:rotate-1">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/90 opacity-95 rounded-xl border border-gray-700" />

      {/* 3D Model */}
      <Canvas className="w-full h-full" camera={{ position: [0, 1.5, 4], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 3]} intensity={2} />
        <pointLight position={[-2, -2, -2]} intensity={1} />
        <spotLight position={[0, 5, 0]} angle={0.6} intensity={2} castShadow />
        <Model modelPath={modelPath} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Card Content */}
      <div className="absolute bottom-0 w-full p-3 bg-black/40 backdrop-blur-md flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-300 flex items-center gap-1">
            <FaEthereum className="text-blue-400 text-lg" /> {price} ETH
          </p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Card;