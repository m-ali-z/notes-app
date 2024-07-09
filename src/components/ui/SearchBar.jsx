import { FaSearch } from "react-icons/fa";
export default function SearchBar() {
  return (
    <div className="p-[3%]">
      <input
        className="w-full bg-white rounded-lg p-2 placeholder:translate-x-6"
        placeholder="Search"
      />
      <FaSearch className="transform -translate-y-7  translate-x-3" />
    </div>
  );
}
