// import React from "react";
// // import { useNavigate } from "react-router-dom"; // Keep if used

// interface LatestProductCardProps {
//   id: string;
//   img: string;
//   name: string;
//   price: number; // CHANGED from rent: string
//   category: string;
// }

// const LatestProductCard: React.FC<LatestProductCardProps> = ({
//   id,
//   img,
//   name,
//   price, // CHANGED from rent
//   category,
// }) => {
//   // const navigate = useNavigate(); // Keep if used

//   // const handleClick = () => {
//   //   navigate(`/home/rental/${category}/${id}`);
//   // };

//   return (
//     <div className="p-4 border rounded-lg shadow-lg bg-white">
//       <div className="h-40 w-full overflow-hidden rounded-t-lg">
//         <img src={img} alt={name} className="h-full w-full object-cover" />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-bold">{name}</h3>
//         <p className="text-sm text-gray-500">Rent</p> {/* This label might need update too */}
//         <p className="text-lg font-semibold">
//             ₹{price} <span className="text-sm font-normal text-gray-500">/ month</span>
//         </p>
//         {/*
//           If the parent div handles the click for navigation, this button might be redundant
//           or could be for a different action like "Add to Cart".
//         */}
//         <button
//           // onClick={handleClick} // This navigation is likely handled by the parent div in RentalHome
//           className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
//         >
//           See More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LatestProductCard;