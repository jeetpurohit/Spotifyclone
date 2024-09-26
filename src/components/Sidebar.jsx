import React, { useState } from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlists";
import axios from "axios"; // Import axios for API requests


export default function Sidebar() {
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions

  // Function to fetch search suggestions from Google API
  const fetchSearchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
      );
      return response.data[1]; // The API returns the suggestions array in the second index
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      return [];
    }
  };

  // Handle search input change
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      const results = await fetchSearchSuggestions(value);
      setSuggestions(results); // Update suggestions based on API response
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleClick = (section) => {
    console.log("Navigating to:", section);
    // Add navigation logic if required
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion); // Set the selected suggestion in the input
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          <li onClick={() => handleClick("home")}>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li onClick={() => handleClick("search")}>
            <MdSearch />
            <span>Search</span>
          </li>
          <li onClick={() => handleClick("library")}>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>

      {/* Search Bar with Auto-Suggestions */}
      <SearchContainer>
        <input
          type="text"
          placeholder="Search for artists"
          value={searchInput}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <SuggestionsContainer>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
            
          </SuggestionsContainer>
        )}
      </SearchContainer>

      <Playlists />
    </Container>
  );
}

// Styled components for the sidebar and suggestions
const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;

// Styled components for the search bar and suggestions dropdown
const SearchContainer = styled.div`
  padding: 1rem;
  position: relative; /* To position suggestions relative to the input */
  input {
    width: 90%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #333;
    color: white;
    &:focus {
      outline: none;
    }
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  background-color: white;
  color: black;
  width: 90%;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 0.5rem;
  z-index: 100;
`;

const SuggestionItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
