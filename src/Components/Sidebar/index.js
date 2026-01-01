import React, { useState, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FaStar } from 'react-icons/fa';
import Button from '@mui/material/Button';

const Sidebar = ({ filterData, filterByPrice, filterByRating }) => {
  const [priceRange, setPriceRange] = useState([100, 60000]);
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const context = useContext(MyContext);

  const handleSubCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSubCat(selectedId);
    filterData(selectedId);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    filterByPrice(newRange);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    filterByRating(rating);
  };

  const subCategoryData = Array.isArray(context?.subCategoryData)
    ? context.subCategoryData
    : [];

  return (
    <div className="sidebar">
      {/* Product Categories */}
      <div className="filterBox">
        <h6>PRODUCT CATEGORIES</h6>
        <div className="scroll">
          <RadioGroup
            name="subcategory-group"
            value={selectedSubCat}
            onChange={handleSubCategoryChange}
            className="RadioGroup"
          >
            {subCategoryData.length > 0 ? (
              subCategoryData.map((item) => (
                <FormControlLabel
                  key={item._id}
                  value={item._id}
                  control={<Radio />}
                  label={item.name}
                  className="formControlLabel w-100"
                />
              ))
            ) : (
              <div className="text-muted">No categories found</div>
            )}
          </RadioGroup>
        </div>
      </div>

      {/* Price Filter */}
      <div className="filterBox">
        <h6>FILTER BY PRICE</h6>
        <RangeSlider
          value={priceRange}
          onInput={handlePriceChange}
          min={100}
          max={60000}
          step={5}
        />
        <div className="d-flex pt-2 pb-2 priceRange">
          <span>
            From: <strong className="text-dark">Rs: {priceRange[0]}</strong>
          </span>
          <span className="ml-auto">
            To: <strong className="text-dark">Rs: {priceRange[1]}</strong>
          </span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filterBox">
        <h6>FILTER BY RATING</h6>
        <div className="scroll">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              className="rating-filter d-flex align-items-center mb-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleRatingClick(rating)}
            >
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  color={index < rating ? '#FFD700' : '#e0e0e0'}
                  size={18}
                />
              ))}
              <span className="ml-2">& Up</span>
            </div>
          ))}

          {selectedRating !== 0 && (
            <Button
              variant="text"
              onClick={() => handleRatingClick(0)}
              style={{ fontSize: '14px', marginTop: '8px', textTransform: 'none' }}
            >
              Clear Rating Filter
            </Button>
          )}
        </div>
      </div>

      {/* Product Status */}
      <div className="filterBox">
        <h6>PRODUCT STATUS</h6>
        <div className="scroll">
          <ul>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="InStock"
              />
            </li>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="OnSale"
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Brands */}
      <div className="filterBox">
        <h6>BRANDS</h6>
        <div className="scroll">
          <ul>
            {['Furo', 'Adidas', 'Reebok', 'Nike', 'Puma'].map((brand, i) => (
              <li key={i}>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label={brand}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Banner */}
      <Link to="#">
        <img
          src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif"
          className="w-100"
          alt="Sidebar Banner"
        />
      </Link>
    </div>
  );
};

export default Sidebar;
