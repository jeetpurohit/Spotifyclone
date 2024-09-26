import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from "axios"; // Ensure axios is imported

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to fetch search suggestions from Google API
  const fetchSearchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
      );
      // The API returns suggestions in the format [query, suggestionsArray]
      return response.data[1]; // Return the suggestions array
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      return [];
    }
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      const results = await fetchSearchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <Container navBackground={navBackground}>
      <div className="search__bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Artists, songs, or podcasts"
          value={searchInput}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <SuggestionsContainer>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </SuggestionItem>
            ))}
          </SuggestionsContainer>
        )}
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  );
}

// Add the styles for the suggestions dropdown
const SuggestionsContainer = styled.div`
  position: absolute;
  background-color: white;
  width: 94%;
  max-height: 150px;
  margin-top: 190px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 1000; // Ensure it appears above other elements
`;

const SuggestionItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};

  .search__bar {
    position: relative; // Make sure to add this to position suggestions correctly
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }

  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;

      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
