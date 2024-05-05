
import './SearchBar.css';
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Enter Room (ex. Olin Hall 155)..."
        value={query}
        onChange={handleChange}
      />
      <button className="search-button" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;