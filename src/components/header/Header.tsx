import { FaHeart } from "react-icons/fa"; // Иконка сердечка

export default function Header() {
  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white shadow-md transition-all duration-300-translate-y-full
      `}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-red-500">LUMO</span>
          <FaHeart className="text-red-500 text-2xl" />
        </div>
      </div>
    </header>
  );
}
