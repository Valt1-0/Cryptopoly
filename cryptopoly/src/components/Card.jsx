import { FaEthereum } from "react-icons/fa";

const Card = ({ title, imgPath, price }) => {
  return (
    <div className="relative w-96 h-56 bg-white/10 border border-white/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
      <div className="absolute top-0 left-0 w-full h-full bg-white/20 rounded-xl shadow-md" />
      {/* Image */}
      <img
        src={imgPath}
        alt={title}
        className="w-full h-full object-cover rounded-xl"
      />
      {/* Card Content */}
      <div className="absolute bottom-0 w-full p-3 bg-black/30 backdrop-blur-md flex justify-between items-center">
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
