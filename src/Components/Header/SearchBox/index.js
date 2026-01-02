import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // 🔍 Search API
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/products/search?q=${value}`
      );
      setResults(res.data);
      setOpen(true);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  // ❌ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👉 On product click
  const handleSelect = (id) => {
    setQuery("");
    setResults([]);
    setOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <div className="headerSearch ml-3 mr-3" ref={searchRef}>
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
      />

      <Button>
        <IoIosSearch />
      </Button>

      {/* 🔽 SEARCH DROPDOWN */}
      {open && results.length > 0 && (
        <ul className="searchDropdown">
          {results.map((item) => (
            <li key={item._id} onClick={() => handleSelect(item._id)}>
              <img
                src={`${API_BASE_URL}${item.images[0]}`}
                alt={item.name}
              />
              <div>
                <p>{item.name}</p>
                <span>₹ {item.price}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
