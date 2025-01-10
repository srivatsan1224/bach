import { motion } from 'framer-motion';

interface ProductCardProps {
  name: string;
  rent: string;
  img: string;
  category: string;
  id: string;
}

const LatestProductCard = ({ name, rent, img, category }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-blue-500 font-bold">{rent}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
            Rent Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestProductCard;