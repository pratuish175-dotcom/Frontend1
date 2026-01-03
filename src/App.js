import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import EmptyCart from "./Pages/EmptyCart";
import Checkout from "./Pages/Checkout";
import Wishlist from "./Pages/Wishlist";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrders from "./Pages/MyOrders";
import OrderTracking from "./Pages/OrderTracking";
import ProductModal from "./Components/ProductModal";
import FunBackground from "./Components/FunBackground";
import WhatsAppChat from "./Components/WhatsAppChat";

import { getSubcategories, getProducts } from "./utils/api";

const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectCountry, setselectedCountry] = useState("");

  const [isOpenProductModal, setIsOpenProductModal] = useState({
    id: "",
    open: false,
  });

  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [productData, setproductdata] = useState(null);
  const [subCategoryData, setsubcategoryData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // ===============================
  // 🌍 Fetch countries + subcategories + restore login
  // ===============================
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/")
      .then((res) => setCountryList(res.data.data));

    getSubcategories("/api/subcategories").then((res) =>
      setsubcategoryData(res || [])
    );

    // Restore wishlist
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    // Restore login
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");

    if (storedLogin === "true" && storedUserId) {
      setIsLogin(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
      setCurrentUser({
        _id: storedUserId,
        name: storedUsername,
      });
    }
  }, []);

  // ===============================
  // 🪟 Product Modal Loader
  // ===============================
  useEffect(() => {
    if (isOpenProductModal.open && isOpenProductModal.id) {
      getProducts(`/api/products/${isOpenProductModal.id}`).then((res) => {
        setproductdata(res);
      });
    }
  }, [isOpenProductModal]);

  // ===============================
  // 🧮 Cart total
  // ===============================
  useEffect(() => {
    const total = cartData.reduce((acc, item) => acc + item.subtotal, 0);
    setCartTotal(total);
  }, [cartData]);

  // ===============================
  // ❤️ Wishlist helpers
  // ===============================
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        toast.info("Already in Wishlist ❤️");
        return prev;
      }

      const updated = [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      toast.success("Added to Wishlist ❤️");
      return updated;
    });
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.error("Removed from Wishlist ❌");
  };

  // ===============================
  // 🛒 Add to cart (local UI)
  // ===============================
  const addToCart = (product) => {
    setCartData((prev) => [...prev, product]);
  };

  // ===============================
  // 🌐 Context values
  // ===============================
  const values = {
    countryList,
    selectCountry,
    setselectedCountry,

    isOpenProductModal,
    setIsOpenProductModal,

    isHeaderFooterShow,
    setisHeaderFooterShow,

    isLogin,
    setIsLogin,

    username,
    setUsername,

    userId,
    setUserId,

    currentUser,
    setCurrentUser,

    subCategoryData,

    cartData,
    setCartData,
    cartTotal,
    addToCart,

    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <BrowserRouter>
      <FunBackground />
      <WhatsAppChat />

      <MyContext.Provider value={values}>
        {isHeaderFooterShow && <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cate/:id" element={<Listing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/empty-cart" element={<EmptyCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderTracking />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        </Routes>

        {isOpenProductModal.open && productData && (
          <ProductModal
            data={productData}
            closeProductModal={() =>
              setIsOpenProductModal({ id: "", open: false })
            }
          />
        )}

        {isHeaderFooterShow && <Footer />}
        <ToastContainer position="top-right" />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
