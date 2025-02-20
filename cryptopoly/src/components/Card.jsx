import { FaEthereum } from "react-icons/fa";

const Card = ({ title, imgPath, price, handleBuy,children }) => {
  return (
    <div className="relative w-80 h-64 bg-white/10 border border-white/20 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon">
      {/* Effet Neon (Halo) */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/40 to-blue-600/40 rounded-xl blur-2xl opacity-50 pointer-events-none" />

      {/* Image NFT */}
      <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
        <img
          src={imgPath}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Contenu de la Card */}
      <div className="relative p-4 bg-white/10 backdrop-blur-lg border-t border-white/20 rounded-b-xl flex justify-between items-center">
        {/* Infos */}
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-300 flex items-center gap-1">
            <FaEthereum className="text-blue-400 text-lg" /> {price} ETH
          </p>
        </div>

        {/* Bouton Buy */}
        {handleBuy && (
          <button
            onClick={handleBuy}
            className="px-4 py-2 bg-gradient-to-r from-accent to-blue-400 hover:from-purple-400 hover:to-accent text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Buy
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
