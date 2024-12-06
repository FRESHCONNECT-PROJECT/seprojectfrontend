const SearchBar = ({ onSearch }) => (
    <div className="flex items-center space-x-2 p-4 bg-gray-900">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 flex-grow bg-gray-800 text-white rounded"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="bg-accent text-white p-2 rounded">Search</button>
    </div>
  );
  export default SearchBar;
  