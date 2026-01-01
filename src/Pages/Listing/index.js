import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { IoIosMenu } from 'react-icons/io';
import { CgMenuGridR } from 'react-icons/cg';
import { TfiLayoutGrid4Alt } from 'react-icons/tfi';
import { FaAngleDown } from 'react-icons/fa6';
import Sidebar from '../../Components/Sidebar';
import ProductItem from '../../Components/Productitem';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../utils/api';

const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState('four');
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 60000]);
  const [selectedSubCatId, setSelectedSubCatId] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const { id } = useParams(); // from route

  const openDropdown = Boolean(anchorEl);

  // Fetch products initially
  useEffect(() => {
    fetchProducts(id, priceRange);
  }, [id]);

  // Apply rating filter whenever productData or rating changes
  useEffect(() => {
    setFilteredProducts(applyRatingFilter(productData, selectedRating));
  }, [productData, selectedRating]);

  const fetchProducts = async (subCatId, range) => {
    const [minPrice, maxPrice] = range;
    let url = `/api/products?`;

    if (subCatId) {
      url += `subCatId=${subCatId}&`;
    }

    url += `minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const res = await getProducts(url);
    setProductData(res);
  };

  const filterData = (subCatId) => {
    setSelectedSubCatId(subCatId);
    fetchProducts(subCatId, priceRange);
  };

  const filterByPrice = (newRange) => {
    setPriceRange(newRange);
    fetchProducts(selectedSubCatId || id, newRange);
  };

  const applyRatingFilter = (products, rating) => {
    if (rating === 0) return products;
  
    return products.filter((product) => {
      const prodRating = Math.floor(product.rating || 0);
      return prodRating === rating;
    });
  };
  

  const filterByRating = (rating) => {
    setSelectedRating(rating); // triggers useEffect
    setCurrentPage(0);
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handlePageChange = (selectedItem) => setCurrentPage(selectedItem.selected);
  const handlePerPageChange = (value) => {
    setProductsPerPage(value);
    setCurrentPage(0);
    handleClose();
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <section className="product_Listing_Page">
      <div className="container">
        <div className="productListing d-flex">
          <Sidebar
            filterData={filterData}
            filterByPrice={filterByPrice}
            filterByRating={filterByRating}
          />

          <div className="content_right">
            <img
              src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg"
              className="w-100"
              style={{ borderRadius: '8px' }}
              alt="Banner"
            />

            <div className="showBy mt-3 mb-3 d-flex align-items-center">
              <div className="btnWrapper d-flex align-items-center">
                <Button onClick={() => setProductView('one')}>
                  <IoIosMenu />
                </Button>
                <Button onClick={() => setProductView('three')}>
                  <TfiLayoutGrid4Alt />
                </Button>
                <Button onClick={() => setProductView('four')}>
                  <CgMenuGridR />
                </Button>
              </div>

              <div className="ml-auto showByFilter">
                <Button onClick={handleClick}>
                  Show {productsPerPage} <FaAngleDown />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openDropdown}
                  onClose={handleClose}
                >
                  {[8, 16, 24, 32].map((num) => (
                    <MenuItem key={num} onClick={() => handlePerPageChange(num)}>
                      {num}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {/* Product Grid */}
            <div className="productGrid">
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <ProductItem key={index} itemView={productView} item={product} />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper mt-4">
              <ReactPaginate
                previousLabel="← Previous"
                nextLabel="Next →"
                breakLabel="..."
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
                forcePage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
