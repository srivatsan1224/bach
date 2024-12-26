export default function Header() {
  return (
    <div>
        <div className="absolute w-full h-[526px] mt-5 bg-[#fc8019] relative flex justify-center items-center">
            <img 
              src="https://i.ibb.co/9gf15kg/Mealawe-Homemade-Food-Thali-Combo-3.webp" 
              alt="Mealawe-Homemade-Food-Thali-Combo-3"
              className="absolute"
              style={{ top: '0', right: '0' }} // Adjust these values dynamically to control position
            />
        </div>
    </div>
  );
}