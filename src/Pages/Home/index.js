import { IoIosArrowRoundForward } from "react-icons/io";
import HomeBanner from "../../Components/HomeBanner";
import banner1 from '../../assets/images/banner1.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Tabs, Tab, CircularProgress, Skeleton } from "@mui/material";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Productitem from "../../Components/Productitem";
import HomeCat from "../../Components/HomeCat";
import newsLetter from "../../assets/images/newsLetter.png";
import banner4 from '../../assets/images/banner4.jpg';
import { IoMailOutline } from "react-icons/io5";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { getCategories, getFeaturedProducts, getProducts } from "../../utils/api";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Home = () => {
    const [catData, setCatData] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [electronicsData, setElectronicsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [showAllProducts, setShowAllProducts] = useState(false);

    useEffect(() => {
        NProgress.start();

        Promise.all([
            getCategories("/api/categories"),
            getFeaturedProducts("/api/products/featured"),
            getProducts("/api/products"),
            getProducts("/api/products?catName=Electronic")
        ])
        .then(([categories, featured, products, electronics]) => {
            setCatData(categories);
            setFeaturedProducts(featured);
            setProductsData(products);
            setFilteredProducts(products);
            setElectronicsData(electronics);
        })
        .finally(() => {
            setLoading(false);
            NProgress.done();
        });
    }, []);

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setShowAllProducts(false); // Reset view all when category changes
    
        if (newValue === 'All') {
            setFilteredProducts(productsData);
        } else {
            const filtered = productsData.filter((product) =>
                product.catName?.toLowerCase().trim() === newValue.toLowerCase().trim()
            );
            setFilteredProducts(filtered);
        }
    };
    

    return (
        <div>
            <HomeBanner />

            {/* Category Section */}
            {loading ? (
                <div className="container mt-4 mb-4">
                    <Skeleton variant="rectangular" height={80} animation="wave" />
                </div>
            ) : (
                catData.length > 0 && <HomeCat catData={catData} />
            )}

            {/* Products Section */}
            <section className="homeProducts">
                <div className="container">
                    <div className="row">
                        {/* Left Side Banners */}
                        <div className="col-md-3">
                            <div className="sticky">
                                <div className="banner">
                                    <img src={banner1} className="cursor w-100" alt="Banner" />
                                </div>
                                <div className="banner mt-4">
                                    <img src={banner1} className="cursor w-100" alt="Banner" />
                                </div>
                            </div>
                        </div>

                        {/* Right Side Products */}
                        <div className="col-md-9 productRow">
                            {/* Featured Products */}
                            <div className="d-flex align-items-center">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">FEATURED PRODUCT</h3>
                                    <p className="text-light text-sml mb-0">
                                        Do not miss the current offers until the end of December
                                    </p>
                                </div>
                                <Button className="viewAllBtn ml-auto">
                                    View All <IoIosArrowRoundForward />
                                </Button>
                            </div>

                            {/* Featured Product Slider */}
                            <div className="product_row w-100 mt-4">
                                {loading ? (
                                    <div className="d-flex">
                                        {[...Array(4)].map((_, i) => (
                                            <Skeleton key={i} variant="rectangular" width={200} height={300} className="mr-3" animation="wave" />
                                        ))}
                                    </div>
                                ) : (
                                    <Swiper slidesPerView={4} spaceBetween={0} modules={[Navigation]} className="mySwiper">
                                        {featuredProducts.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <Productitem item={product} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </div>

                            {/* New Products */}
                            <div className="d-flex align-items-center mt-5">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                                    <p className="text-light text-sml mb-0">
                                        Do not miss the current offers until the end of December
                                    </p>
                                </div>
                                {/* Tabs */}
                                <div className="ml-auto" style={{ minWidth: "300px" }}>
                                <Tabs
    value={selectedCategory}
    onChange={handleCategoryChange}
    textColor="primary"
    indicatorColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="category tabs"
>
    <Tab label="All" value="All" />
    {catData.map((cat, index) => (
        <Tab key={index} label={cat.name} value={cat.name} />
    ))}
</Tabs>

                                </div>
                            </div>

                            {/* New Product List */}
                            <div className="product_row productrow2 w-100 mt-4 d-flex flex-wrap">
                                {loading ? (
                                    [...Array(8)].map((_, i) => (
                                        <Skeleton key={i} variant="rectangular" width={200} height={300} className="m-2" animation="wave" />
                                    ))
                                ) : (
                                    (showAllProducts ? filteredProducts : filteredProducts.slice(0, 8)).map((item, index) => (
                                        <Productitem key={index} item={item} />
                                    ))
                                )}
                            </div>

                            {/* View All and Back Button */}
                            {!loading && filteredProducts.length > 8 && (
                                <div className="text-center w-100 mt-3">
                                    {!showAllProducts ? (
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => setShowAllProducts(true)}
                                        >
                                            View All
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="outlined" 
                                            color="secondary" 
                                            onClick={() => setShowAllProducts(false)}
                                        >
                                            Back
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* Electronics Products */}
                            <div className="d-flex align-items-center mt-5">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">ELECTRONICS</h3>
                                    <p className="text-light text-sml mb-0">
                                        Do not miss the current offers until the end of December
                                    </p>
                                </div>
                                <Button className="viewAllBtn ml-auto">
                                    View All <IoIosArrowRoundForward />
                                </Button>
                            </div>

                            {/* Electronics Product List */}
                            <div className="product_row productrow2 w-100 mt-4 d-flex flex-wrap">
                                {loading ? (
                                    [...Array(6)].map((_, i) => (
                                        <Skeleton key={i} variant="rectangular" width={200} height={300} className="m-2" animation="wave" />
                                    ))
                                ) : (
                                    electronicsData.map((item, index) => (
                                        <Productitem key={index} item={item} />
                                    ))
                                )}
                            </div>

                            {/* Bottom Banners */}
                            <div className="d-flex mt-4 mb-5 bannerSec">
                                <div className="banner">
                                    <img src={banner4} className="cursor w-100" alt="Banner 4" />
                                </div>
                                <div className="banner">
                                    <img src={banner4} className="cursor w-100" alt="Banner 4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-white mb-1">$20 discount for your first order</p>
                            <h3 className="text-white">Join our newsletter and get...</h3>
                            <p className="text-light">
                                Join our email subscription now to get updates on <br /> promotion and coupons
                            </p>
                            <form>
                                <IoMailOutline />
                                <input type="email" placeholder="Your Email Address" />
                                <Button>Subscribe</Button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src={newsLetter} alt="Newsletter" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
