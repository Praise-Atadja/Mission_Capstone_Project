import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="relative mb-8 max-w-lg">
            <input
                type="text"
                className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none"
                placeholder="Search for a patient, ECG report, or referral..."
            />
            <button className="absolute top-2 right-2 p-2 bg-purple-600 rounded-full">
                <Search className="text-white" />
            </button>
        </div>
    );
};

export default SearchBar;
